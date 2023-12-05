import Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
}).messages({
  'string.email': 'Email inválido',
  'string.min': 'O campo {#label} deve ter no mínimo {#limit} caracteres',
  'any.required': 'All fields must be filled',
});

export default userSchema;
