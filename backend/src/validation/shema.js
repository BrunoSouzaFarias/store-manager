const joi = require('joi');

const productSchema = joi.object({
  name: joi.string().min(5).required(),
}).messages({
  'any.required': '{{#label}} is required',
  'string.empty': '{{#label}} is not allowed to be empty',
  'string.min': '{{#label}} length must be at least 5 characters long',
});

const validateProduct = (product) => {
  const { error } = productSchema.validate(product);
  if (error) {
    return error;
  }
  return false;
};

module.exports = validateProduct;