const express = require('express');
const { productsController, salesController } = require('./controllers');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar 
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', async (_req, res) => productsController.getProducts(res));

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  return productsController.getProductsById(res, id);
});

app.post('/products', async (req, res) => productsController.postProducts(req, res));

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  return productsController.putProducts(res, id, body);
});

app.get('/sales', async (_req, res) => salesController.getSales(res));

app.get('/sales/:id', async (req, res) => {
  const { id } = req.params;
  return salesController.getSalesById(res, id);
});

app.post('/sales', async (req, res) => salesController.postSales(req, res));

module.exports = app;