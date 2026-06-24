// ShieldGate v2.1 - Tenant & Society Scope Validation Middleware

function validateScope(user) {
  // Platform-level users (Super Admins) are not society scoped
  if (user.role === "SUPER_ADMIN") {
    return {
      tenantId: null,
      societyId: null,
    };
  }

  // Tenant-scoped users must have tenantId and societyId
  if (!user.tenantId || !user.societyId) {
    throw new Error(
      "Tenant-scoped users must have tenantId and societyId"
    );
  }

  return {
    tenantId: user.tenantId,
    societyId: user.societyId,
  };
}

module.exports = validateScope;
