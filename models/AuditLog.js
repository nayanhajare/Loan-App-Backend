const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  user: { type: String, required: true },
  action: { type: String, required: true },
  target: { type: String },
  details: { type: String },
});

module.exports = mongoose.model('AuditLog', auditLogSchema); 