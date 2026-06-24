// Platform-level users are not society scoped

function validateScope(user) {
  if (user.role === "SUPER_ADMIN") {
    return {
      tenantId: null,
      societyId: null,
    };
  }

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
