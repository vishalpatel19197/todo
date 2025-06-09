const Joi = require("joi");

const userValidation = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .optional()
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10 digits",
    }),
});

const roleValidation = Joi.object({
  role: Joi.array().required(),
  userId: Joi.string().required(),
});
module.exports = { userValidation, roleValidation };
