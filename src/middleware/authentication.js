
exports.checkAuth = (req, res, next) => {
  try {
    const token = req.cookies["token"];
    if (!token) {
      return response(401, "LOGIN", {}, res);
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return errorHandler(error, res);
  }
};
