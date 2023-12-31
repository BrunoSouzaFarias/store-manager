const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return { status: 'SUCCESSFUL', data: products };
};

const getProductsById = async (id) => {
  const products = await productsModel.getById(id);
  if (!products) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: products };
};

const addNewProduct = async (name) => {
  const insertedId = await productsModel.addNewProduct(name);
  const product = await productsModel.getById(insertedId);

  return { status: 'CREATED', data: product };
};

const updateProduct = async (id, name) => {
  const product = await productsModel.getById(id);

  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  const productUpdated = await productsModel.updateProduct(id, name);

  return { status: 'SUCCESSFUL', data: productUpdated };
};

const deleteProduct = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  await productsModel.deleteProduct(id);
  return { status: 'DELETED', data: null };
};

module.exports = { 
  getAllProducts,
  getProductsById,
  addNewProduct,
  updateProduct,
  deleteProduct,
};