const { response, errorHandler } = require("../util/response");

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const messages = error.details[0].message.split('"').join("").split("`").join("");
        return response(res, 400, "VALIDATIONERROR", { errors: messages });
      }
      next();
    } catch (error) {
      return errorHandler(error, res);
    }
  };
};

module.exports = validate;
