const connection = require('./conection');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getById = async (id) => {
  const [[products]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return products;
};

const addNewProduct = async (name) => {
  const query = 'INSERT INTO products (name) VALUE (?);';
    const [{ insertId }] = await connection.execute(query, [name]);
    return insertId;
};

const updateProduct = async (id, name) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?;';
  await connection.execute(query, [name, id]);
  const updatedProduct = await getById(id);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?;';
  const [response] = await connection.execute(query, [id]);
  return response;
};

module.exports = { 
getAllProducts,
 getById,
addNewProduct,
updateProduct, 
deleteProduct,
};