const validateSale = require('../validation/shema.sale');

const saleValidation = (req, res, next) => {
  const sale = req.body;

  const error = validateSale(sale);

  const existProductId = sale.some((item) => !item.productId);
  const quantityVerify = sale.some((item) => item.quantity <= 0);
  const existQuantity = sale.some((item) => !item.quantity);

  if (quantityVerify) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  if (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (existProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (existQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

module.exports = saleValidation;