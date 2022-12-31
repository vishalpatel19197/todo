exports.login = () => {};

exports.logOut = () => {};

exports.singUp = (req, res) => {
  try {
    const userData = req.body;
    if (
      !userData.userName ||
      !userData.password ||
      !userData.firstName ||
      !userData.lastName
    ) {
      return response(403, "VALIDATIONERROR", {}, res);
    }
  } catch (error) {
    return errorHandler(error, res);
  }
};
