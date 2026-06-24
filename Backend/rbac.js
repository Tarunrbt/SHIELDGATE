function authorize(...allowedRoles) {
return (req, res, next) => {
try {
if (!req.user) {
return res.status(401).json({
success: false,
message: "Unauthenticated request",
});
}

  if (!allowedRoles.includes(req.user.role)) {

    // Future Audit Trail Hook
    /*
    await AuditTrail.create({
      action: "AUTHORIZATION_DENIED",
      userId: req.user.userId,
      tenantId: req.user.tenantId,
      societyId: req.user.societyId,
      role: req.user.role,
      endpoint: req.originalUrl,
      ipAddress: req.ip
    });
    */

    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }

  next();
} catch (error) {
  return res.status(500).json({
    success: false,
    message: "Authorization failed",
    error: error.message,
  });
}

};
}

module.exports = authorize;
