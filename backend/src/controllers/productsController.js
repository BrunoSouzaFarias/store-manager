const { productServices } = require('../services');
const errorMap = require('../middlewares/mapStatus');

const getProducts = async (_req, res) => {
  const { status, data } = await productServices.getAllProducts();
  return res.status(errorMap(status)).json(data);
};

const getId = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productServices.getProductsById(id);
  return res.status(errorMap(status)).json(data);
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await productServices.addNewProduct(name);

  return res.status(errorMap(status)).json(data);
};

const productUpdate = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, data } = await productServices.updateProduct(id, name);
  return res.status(errorMap(status)).json(data);
};

const productDelete = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productServices.deleteProduct(id);
  return res.status(errorMap(status)).json(data);
};

module.exports = {
 getProducts,
 getId,
 addProduct,
 productUpdate,
 productDelete,
};