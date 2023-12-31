const joi = require('joi');

const saleItemSchema = joi.object({
  productId: joi.number().required().messages({
    'any.required': '"productId" is required',
  }),
  quantity: joi.number().integer().min(1).required()
.messages({
    'number.min': '"quantity" must be greater than or equal to 1',
    'any.required': '"quantity" is required',
  }),
});

const validateSale = (sales) => {
 if (!Array.isArray(sales) || sales.length === 0) {
    return { statusCode: 400, message: 'Sale data is required' };
  }

  for (let index = 0; index < sales.length; index += 1) {
    const sale = sales[index];
    const { error } = saleItemSchema.validate(sale);
    if (error) {
      return { statusCode: 400, message: error.details[0].message };
    }
  }

  return false;
};

module.exports = validateSale;