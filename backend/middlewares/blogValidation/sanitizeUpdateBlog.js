const joi = require("joi");

const sanitizeUpdateBlog = async (req, res, next) => {
  try {
    const schema = joi.object({
      post_id: joi.string().guid({ version: "uuidv4" }).required().messages({
        "any.required": "Post id is required",
        "string.empty": "Post id cannot be empty",
        "string.guid": "Id must be a valid UUID v4",
        "string.uuid": "Id must be a valid UUID v4",
      }),
      title: joi.string().trim().required().messages({
        "any.required": "Post Title is required",
        "string.empty": "Post Title is requiredI",
      }),
      body: joi.string().trim().required().messages({
        "any.required": "Post Body is required",
        "string.empty": "Post body is required",
      }),
    });

    const value = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    next();
  } catch (error) {
    console.error("Invalid Input format:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports=sanitizeUpdateBlog