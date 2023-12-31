const router = require('express').Router();
const { salesController } = require('../controllers');
const { saleValidation } = require('../middlewares');

router.get('/', salesController.getSales);

router.get('/:id', salesController.getSalesId);

router.post('/', saleValidation, salesController.addSale);

router.delete('/:id', salesController.saleDelete);

module.exports = router;