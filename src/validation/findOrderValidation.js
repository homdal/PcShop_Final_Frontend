import Joi from "joi";
import validation from "./validation";

const findOrderSchema = Joi.object({
  orderNum: Joi.number()
    .messages({
      "number.base": "Must enter a number",
    })
    .required(),
});

const validateFindOrder = (inputToCheck) =>
  validation(findOrderSchema, inputToCheck);

export { validateFindOrder };
