const mongoose = require('mongoose');

const loanApplicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['Submitted', 'Under Review', 'Approved', 'Denied'], default: 'Submitted' },
    steps: [{ type: String }],
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
    repaymentSchedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Repayment' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoanApplication', loanApplicationSchema); 