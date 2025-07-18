const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const isUser = (req, res, next) => {
    if (req.user?.role !== 'user') return res.status(403).json({ message: 'User access only' });
    next();
};

const isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admin access only' });
    next();
};

module.exports = auth;
module.exports.isUser = isUser;
module.exports.isAdmin = isAdmin; 