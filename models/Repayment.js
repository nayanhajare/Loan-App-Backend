const mongoose = require('mongoose');

const repaymentSchema = new mongoose.Schema({
    loan: { type: mongoose.Schema.Types.ObjectId, ref: 'LoanApplication', required: true },
    dueDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['Paid', 'Overdue', 'Upcoming'], default: 'Upcoming' },
    paidAt: { type: Date }
});

module.exports = mongoose.model('Repayment', repaymentSchema); 