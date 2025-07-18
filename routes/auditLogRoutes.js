const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/authMiddleware');
const { getAuditLogs } = require('../controllers/auditLogController');

// GET /api/audit-logs - admin only
router.get('/', auth, isAdmin, getAuditLogs);

module.exports = router; 