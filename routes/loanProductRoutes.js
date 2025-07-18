const express = require('express');
const router = express.Router();
const { getLoanProducts, calculatePayment } = require('../controllers/loanProductController');

router.get('/', getLoanProducts);
router.post('/calculate', calculatePayment);

module.exports = router; 