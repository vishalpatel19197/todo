const { roleUserModel } = require("../api/role/roleModel");
const { verifyToken } = require("../util/commen");
const { response, errorHandler } = require("../util/response");

exports.checkAuth = async (req, res, next) => {
  const checkToken = req.headers.authtoken || req.headers.cookie; // Extract Bearer token
  const token = checkToken && checkToken.split("=")[1]; // Split to get the token part

  // Check for Bearer token
  if (!token) {
    return response(res, 401, "UNAUTHORIZED");
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return response(res, 401, "UNAUTHORIZED");
    }
    const getUserRole = await roleUserModel
      .findOne({ userId: decoded._id }, "key")
      .lean();

    // If token is valid, attach user info to request object
    req.user = { ...decoded, role: getUserRole.key || [] }; // Attach user info to request
    next();
  } catch (err) {
    return errorHandler(err, res);
  }
};
