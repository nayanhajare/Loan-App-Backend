const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    loan: { type: mongoose.Schema.Types.ObjectId, ref: 'LoanApplication', required: true },
    type: { type: String, required: true },
    status: { type: String, enum: ['Pending Review', 'Approved', 'Requires Resubmission'], default: 'Pending Review' },
    fileUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', documentSchema); 