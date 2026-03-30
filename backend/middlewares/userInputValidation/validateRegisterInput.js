const joi = require("joi");

const sanitizeRegisterInput = async (req, res, next) => {
  try {
    const schema = joi.object({
      username: joi.string().required().messages({
        "string.empty": "Username is required",
        "any.required": "Username is required",
      }),

      email: joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
        "any.required": "Email is required",
      }),

      password: joi.string().min(6).max(20).required().messages({
        "string.empty": "Password is required",
        "any.required": "Password is required",
        "string.min": "Password must be at least 6 characters",
        "string.max": "Password must be at most 20 characters",
      }),

      repeatpassword: joi
        .string()
        .valid(joi.ref("password"))
        .required()
        .messages({
          "any.only": "Passwords do not match",
          "string.empty": "Repeat password is required",
          "any.required": "Repeat password is required",
        }),
    });

    await schema.validateAsync(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    next();
  } catch (error) {
    console.error(`Validation error: ${error.message}`);
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = sanitizeRegisterInput;
