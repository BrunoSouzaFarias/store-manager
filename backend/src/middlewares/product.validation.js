const validateProduct = require('../validation/shema');

const productValidation = (req, res, next) => {
  const error = validateProduct(req.body);
  if (error && error.message.includes('require')) {
    return res.status(400).json({ message: error.message });
  }
  if (error && error.message.includes('length')) {
    return res.status(422).json({ message: error.message });
  }
  next();
};

module.exports = productValidation;