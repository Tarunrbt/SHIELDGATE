module.exports = {
  SUPER_ADMIN: ["*"],

  TENANT_ADMIN: [
    "USER_READ",
    "USER_CREATE",
    "USER_UPDATE",
    "USER_DELETE",
    "AUDIT_READ"
  ],

  SOCIETY_ADMIN: [
    "USER_READ",
    "VISITOR_APPROVE"
  ],

  GUARD: [
    "VISITOR_READ",
    "VISITOR_CREATE"
  ],

  RESIDENT: [
    "VISITOR_CREATE"
  ]
};
