await logAudit({
   action: "AUTHORIZATION_DENIED",
   req,
   metadata: {
      role,
      permission: requiredPermission
   }
});
