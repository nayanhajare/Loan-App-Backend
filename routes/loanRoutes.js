const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { isUser, isAdmin } = require('../middlewares/authMiddleware');
const { applyLoan, getUserLoans, updateLoanStatus, addRepayment, getRepayments, markRepaymentPaid } = require('../controllers/loanController');
const LoanApplication = require('../models/LoanApplication');

router.post('/apply', auth, isUser, applyLoan);
router.get('/my', auth, isUser, getUserLoans);
router.patch('/:id/status', auth, updateLoanStatus);

// Admin: Get all loans
router.get('/all', auth, isAdmin, async (req, res) => {
  try {
    const loans = await LoanApplication.find().populate('documents').populate('repaymentSchedule').populate('user', 'name email');
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Repayment routes
router.post('/:loanId/repayments', auth, isUser, addRepayment);
router.get('/:loanId/repayments', auth, isUser, getRepayments);
router.patch('/:loanId/repayments/:repaymentId/paid', auth, isUser, markRepaymentPaid);

module.exports = router; 