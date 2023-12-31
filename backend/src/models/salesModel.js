const connection = require('./conection');

const getAllSales = async () => {
  const query = `SELECT sp.sale_id as saleId, sp.product_id as productId, sp.quantity, s.date
    FROM sales_products sp
    INNER JOIN sales s ON sp.sale_id = s.id`;

  const [sales] = await connection.execute(query);
  return sales;
};

const getSalesById = async (id) => {
  const query = `SELECT s.date, sp.product_id as productId, sp.quantity
    FROM sales_products sp
    INNER JOIN sales s ON sp.sale_id = s.id
    WHERE sp.sale_id=?
    ORDER BY sp.sale_id`;

  const [sale] = await connection.execute(query, [id]);
  return sale;
};

const addNewSale = async (sold) => {
  const query1 = 'INSERT INTO sales (date) VALUES (?)';
  const [{ insertId }] = await connection.execute(query1, [new Date()]);

  const queriesArray = sold.map(async (element) => {
    const { productId, quantity } = element;
    const query2 = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
    await connection.execute(query2, [insertId, productId, quantity]);
  });

  await Promise.all(queriesArray);

  return insertId;
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?;';
  const [response] = await connection.execute(query, [id]); 
  return response;
};

module.exports = {
  getAllSales,
  getSalesById,
  addNewSale,
  deleteSale,
};