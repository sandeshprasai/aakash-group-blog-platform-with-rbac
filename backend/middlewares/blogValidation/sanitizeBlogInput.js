const joi = require("joi");

const sanitizeBlogInput = async (req, res, next) => {
  console.log("request received at middlware")
  try {
    const schema = joi.object({
      title: joi.string().trim().required().messages({
        "string.empty": "Blog title is required",
        "any.required": "Blog title is required",
      }),

      body: joi.string().trim().required().min(100).messages({
        "string.empty": "Post description is required",
        "any.required": "Post description is required",
        "string.min": "Post descriptopn should mininum of 100 characters ",
      }),
    });

    await schema.validate(req.body, {
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

module.exports = sanitizeBlogInput;
