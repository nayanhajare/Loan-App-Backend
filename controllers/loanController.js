const LoanApplication = require('../models/LoanApplication');
const Repayment = require('../models/Repayment');
const AuditLog = require('../models/AuditLog');

const applyLoan = async (req, res) => {
    try {
        const { amount } = req.body;
        const loan = new LoanApplication({
            user: req.user.id,
            amount,
            steps: ['Personal Info', 'Financial Details', 'Document Upload'],
        });
        await loan.save();
        res.status(201).json(loan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUserLoans = async (req, res) => {
    try {
        const loans = await LoanApplication.find({ user: req.user.id }).populate('documents').populate('repaymentSchedule');
        res.json(loans);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateLoanStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const loan = await LoanApplication.findById(req.params.id);
        if (!loan) return res.status(404).json({ message: 'Loan not found' });
        loan.status = status;
        await loan.save();
        // On approval, generate repayment schedule if not already present
        if (status === 'Approved' && (!loan.repaymentSchedule || loan.repaymentSchedule.length === 0)) {
            const repayments = [];
            const today = new Date();
            const monthlyAmount = Math.round(loan.amount / 12);
            for (let i = 1; i <= 12; i++) {
                const dueDate = new Date(today.getFullYear(), today.getMonth() + i, today.getDate());
                const repayment = new Repayment({
                    loan: loan._id,
                    dueDate,
                    amount: monthlyAmount,
                    status: 'Upcoming',
                });
                await repayment.save();
                repayments.push(repayment._id);
            }
            loan.repaymentSchedule = repayments;
            await loan.save();
        }
        // Audit log for approval
        if (status === 'Approved') {
            await AuditLog.create({
                user: req.user.email || req.user.id,
                action: 'Approved Loan',
                target: `Loan #${loan._id}`,
                details: `Loan approved for ₹${loan.amount}`
            });
        }
        res.json(loan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addRepayment = async (req, res) => {
    try {
        const { dueDate, amount } = req.body;
        const repayment = new Repayment({
            loan: req.params.loanId,
            dueDate,
            amount,
        });
        await repayment.save();
        // Add repayment to loan
        await LoanApplication.findByIdAndUpdate(req.params.loanId, { $push: { repaymentSchedule: repayment._id } });
        res.status(201).json(repayment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getRepayments = async (req, res) => {
    try {
        const repayments = await Repayment.find({ loan: req.params.loanId });
        res.json(repayments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Mark repayment as paid
const markRepaymentPaid = async (req, res) => {
    try {
        const repayment = await Repayment.findById(req.params.repaymentId);
        if (!repayment) return res.status(404).json({ message: 'Repayment not found' });
        repayment.status = 'Paid';
        repayment.paidAt = new Date();
        await repayment.save();
        res.json(repayment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { applyLoan, getUserLoans, updateLoanStatus, addRepayment, getRepayments, markRepaymentPaid }; 