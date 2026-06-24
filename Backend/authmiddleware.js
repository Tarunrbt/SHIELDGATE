const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validateScope = require("./validateScope");

// TODO: Replace with actual User model
// const User = require("./models/User");

const VALID_ROLES = [
"SUPER_ADMIN",
"TENANT_ADMIN",
"SOCIETY_ADMIN",
"SECURITY_GUARD",
"HELPDESK",
"RESIDENT",
];

async function verifyJWT(req, res, next) {
try {
const authHeader = req.headers.authorization;

if (!authHeader || !authHeader.startsWith("Bearer ")) {
  return res.status(401).json({
    success: false,
    message: "Authorization token missing",
  });
}

const token = authHeader.split(" ")[1];

const decoded = jwt.verify(
  token,
  process.env.JWT_ACCESS_SECRET
);

if (!decoded.sub) {
  return res.status(401).json({
    success: false,
    message: "Invalid token payload",
  });
}

if (
  decoded.tenantId &&
  !mongoose.Types.ObjectId.isValid(decoded.tenantId)
) {
  return res.status(401).json({
    success: false,
    message: "Invalid tenantId",
  });
}

if (
  decoded.societyId &&
  !mongoose.Types.ObjectId.isValid(decoded.societyId)
) {
  return res.status(401).json({
    success: false,
    message: "Invalid societyId",
  });
}

if (!VALID_ROLES.includes(decoded.role)) {
  return res.status(403).json({
    success: false,
    message: "Invalid role",
  });
}

/*
Future User Validation

const user = await User.findById(decoded.sub);

if (!user || user.isDeleted) {
  throw new Error("Account disabled");
}

if (user.tokenVersion !== decoded.tokenVersion) {
  throw new Error("Token revoked");
}
*/

const userContext = {
  userId: decoded.sub,
  tenantId: decoded.tenantId || null,
  societyId: decoded.societyId || null,
  role: decoded.role,
  tokenVersion: decoded.tokenVersion,
};

await validateScope(userContext);

req.user = userContext;

next();

} catch (error) {
return res.status(401).json({
success: false,
message: "Authentication failed",
error: error.message,
});
}
}

module.exports = {
verifyJWT,
};
