const AuditLog = require('../models/AuditLog');

// GET /api/audit-logs - admin only
const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAuditLogs }; 