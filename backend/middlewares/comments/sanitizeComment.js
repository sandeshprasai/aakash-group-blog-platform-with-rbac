const Joi = require("joi");
const sanitizeComments = async (req, res, next) => {
  try {
    const schema = Joi.object({
      comment: Joi.string().trim().required().messages({
        "string.empty": "Comment body is required",
        "any.required": "Comment body is required",
      }),
      post_id: Joi.string().guid({ version: "uuidv4" }).required().messages({
        "any.required": "Post id is required",
        "string.empty": "Post id cannot be empty",
        "string.guid":" Post Id must be a valid UUID v4",
        "string.uuid":"Post Id must be a valid UUID v4",
      }),
    });

    const value = await schema.validateAsync(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    req.body = value;
    next();
  } catch (error) {
    console.log("Validation error:", error.details);

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map((err) => err.message),
    });
  }
};

module.exports = sanitizeComments;
