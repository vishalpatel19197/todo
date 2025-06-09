const { response } = require("../util/response");

const checkRole = (role = []) => {
  return (req, res, next) => {
    const userRole = req.user.role || []; // Assuming req.user is populated with user data

    if (!userRole) {
      return response(res, 403, "ACCESSDENIED");
    }
    const findRole = role.some((r) => userRole.includes(r));
    if (findRole) {
      next(); // User has the required role, proceed to the next middleware or route handler
    } else {
      return response(res, 403, "INSUFFICIENTPERMISSIONS");
    }
  };
};
module.exports = checkRole;
