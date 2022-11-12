exports.checkAuth = (req, res, next) => {
  try {
    const token = req.cookies["token"];
    if (!token) {
      return res.json(response(200, "LOGIN"));
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.json(response(200, "SERVERERROR"));
  }
};
