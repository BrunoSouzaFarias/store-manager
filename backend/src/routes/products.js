const router = require('express').Router();
const { productsController } = require('../controllers/productsController');
const productsValidation = require('../middlewares/product.validation');

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getId);

router.post('/', productsValidation, productsController.addProduct);

router.put('/:id', productsValidation, productsController.productUpdate);

router.delete('/:id', productsController.productDelete);

module.exports = router;