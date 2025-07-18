const mongoose = require('mongoose');

const loanProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Personal', 'Student', 'Mortgage', 'Auto', 'Other'], required: true },
    interestRate: { type: Number, required: true }, // annual percentage
    minAmount: { type: Number, required: true },
    maxAmount: { type: Number, required: true },
    minTerm: { type: Number, required: true }, // in months
    maxTerm: { type: Number, required: true }, // in months
    description: { type: String }
});

module.exports = mongoose.model('LoanProduct', loanProductSchema); 