const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { uploadDocument, getDocuments, updateDocumentStatus } = require('../controllers/documentController');

router.post('/upload', auth, uploadDocument);
router.get('/my', auth, getDocuments);
router.patch('/:id/status', auth, updateDocumentStatus);

module.exports = router; 