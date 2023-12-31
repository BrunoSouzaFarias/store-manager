const { salesModel, productsModel } = require('../models');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return { status: 'SUCCESSFUL', data: sales };
};

const getSalesById = async (id) => {
  const sales = await salesModel.getSalesById(id);
  if (!sales.length) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data: sales };
};

const addNewSale = async (sold) => {
  const arrayProducts = sold.map(async ({ productId }) => productsModel.getById(productId));
  const products = await Promise.all(arrayProducts);

  if (products.includes(undefined)) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  const id = await salesModel.addNewSale(sold);
  const sale = await salesModel.getSalesById(id);
  const newSale = {
    id: Number(id),
    itemsSold: sale.map(({ productId, quantity }) => ({ productId, quantity })),
  };

  return { status: 'CREATED', data: newSale };
};

const deleteSale = async (id) => {
  const sale = await salesModel.getSalesById(id);
  if (!sale.length) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  await salesModel.deleteSale(id);
  return { status: 'DELETED', data: null };
};

module.exports = {
  getAllSales,
  getSalesById,
  addNewSale,
  deleteSale,
};