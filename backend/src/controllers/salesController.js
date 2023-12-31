const { salesServices } = require('../services');
const errorMap = require('../middlewares/mapStatus');

const getSales = async (_req, res) => {
  const { status, data } = await salesServices.getAllSales();
  return res.status(errorMap(status)).json(data);
};

const getSalesId = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesServices.getSalesById(id);
  return res.status(errorMap(status)).json(data);
};

const addSale = async (req, res) => {
  const sold = req.body;
  const { status, data } = await salesServices.addNewSale(sold);
  return res.status(errorMap(status)).json(data);
};

const saleDelete = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesServices.deleteSale(id);
  return res.status(errorMap(status)).json(data);
};

module.exports = {
   getSales,
   getSalesId,
   addSale,
   saleDelete,
};