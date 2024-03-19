import Joi from "joi";
import validation from "./validation";

const emailSubSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "must provide an email",
      "string.email":
        "must be a valid email address, example: name@example.com",
      "string.min": "must be at least 5 characters long",
    })
    .required()
    .min(5),
});

const validateEmailSub = (inputToCheck) =>
  validation(emailSubSchema, inputToCheck);

export { validateEmailSub };
