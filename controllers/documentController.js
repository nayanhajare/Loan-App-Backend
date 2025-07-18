const Document = require('../models/Document');
const LoanApplication = require('../models/LoanApplication');

const uploadDocument = async (req, res) => {
    try {
        // For simplicity, assume fileUrl is sent in body. In production, use multer or cloud storage.
        const { loan, type, fileUrl } = req.body;
        const document = new Document({
            user: req.user.id,
            loan,
            type,
            fileUrl
        });
        await document.save();
        // Add document to loan
        await LoanApplication.findByIdAndUpdate(loan, { $push: { documents: document._id } });
        res.status(201).json(document);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getDocuments = async (req, res) => {
    try {
        const documents = await Document.find({ user: req.user.id });
        res.json(documents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateDocumentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const document = await Document.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(document);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { uploadDocument, getDocuments, updateDocumentStatus }; 