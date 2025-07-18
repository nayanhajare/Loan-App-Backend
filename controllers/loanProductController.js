const LoanProduct = require('../models/LoanProduct');

// Get all loan products (with optional filters)
const getLoanProducts = async (req, res) => {
    try {
        const { type, minRate, maxRate, minTerm, maxTerm } = req.query;
        let filter = {};
        if (type) filter.type = type;
        if (minRate || maxRate) filter.interestRate = {};
        if (minRate) filter.interestRate.$gte = Number(minRate);
        if (maxRate) filter.interestRate.$lte = Number(maxRate);
        if (minTerm || maxTerm) filter.minTerm = {};
        if (minTerm) filter.minTerm.$gte = Number(minTerm);
        if (maxTerm) filter.minTerm.$lte = Number(maxTerm);
        const products = await LoanProduct.find(filter);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Calculate estimated monthly payment
const calculatePayment = (req, res) => {
    const { amount, interestRate, term } = req.body;
    if (!amount || !interestRate || !term) {
        return res.status(400).json({ message: 'amount, interestRate, and term are required' });
    }
    // Formula: M = P * r * (1 + r)^n / ((1 + r)^n - 1)
    // P = principal, r = monthly rate, n = number of months
    const P = Number(amount);
    const r = Number(interestRate) / 100 / 12;
    const n = Number(term);
    const M = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    res.json({ monthlyPayment: M.toFixed(2), totalPayment: (M * n).toFixed(2) });
};

module.exports = { getLoanProducts, calculatePayment }; 