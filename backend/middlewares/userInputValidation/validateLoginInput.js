const joi = require("joi");

const sanitizeLoginInput = async (req, res) => {
  try {
    const schema = joi.object({
      username: joi.string().trim().required().message({
        "string.empty": "Username is required",
        "any.required": "Username is required",
      }),

      password: joi.string().requires().message({
        "string.empty": "Password is required",
        "any.required": "Password is required",
      }),
    });
    rememberMe: joi.boolean().message({
      "boolean.base":
        "Remember Me should be boolean value (Either True or False)",
    });
    await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (error) {
    console.error(`Validation error ${error.message}`);
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = sanitizeLoginInput;
