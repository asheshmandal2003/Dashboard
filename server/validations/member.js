import Joi from "joi";

export const validateMember = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Name should be a type of text",
      "string.empty": "Name cannot be an empty field",
      "any.required": "Name is a required field",
    }),
    team: Joi.string().required().messages({
      "string.base": "Team should be a type of text",
      "string.empty": "Team cannot be an empty field",
      "any.required": "Team is a required field",
    }),
    email: Joi.string().email().required().messages({
      "string.base": "Email should be a type of text",
      "string.email": "Email must be a valid email",
      "string.empty": "Email cannot be an empty field",
      "any.required": "Email is a required field",
    }),
    location: Joi.string().required().messages({
      "string.base": "Location should be a type of text",
      "string.empty": "Location cannot be an empty field",
      "any.required": "Location is a required field",
    }),
    image: Joi.string().uri().optional().messages({
      "string.base": "Image should be a type of text",
      "string.uri": "Image must be a valid URI",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
