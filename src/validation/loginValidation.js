import Joi from "joi";
import validation from "./validation";

const loginSchema = Joi.object({
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
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{6,}$/
      )
    )
    .messages({
      "string.pattern.base":
        "The password needs to contain at least one upper case letter, one lower case letter, one of the following symbols: !@#$%^&* and be between 7 to 20 characters in length",
      "string.empty": "must provide a password",
      "string.min": "must be at least 7 characters long",
      "string.max": "cannot be longer than 20 characters",
    })
    .min(7)
    .max(20)
    .required(),
});

const validateLogin = (inputToCheck) => validation(loginSchema, inputToCheck);

export { validateLogin };
