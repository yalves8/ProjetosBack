const connection = require('./connection');

const insertSaleProduct = async (saleId, productId, quantity) => {
    const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
    VALUES (?,?, ?);`;

    await connection.execute(query, [saleId, productId, quantity]);
    return {
        saleId,

    };
};

const insertSale = async (data) => {
    const query = `INSERT INTO StoreManager.sales (date) VALUES ('${data}');`;

    const [result] = await connection.execute(query);
    return { id: result.insertId };
};

const listIds = async () => {
    const query = 'SELECT id FROM StoreManager.products';

    const [result] = await connection.execute(query);
    return result;
};

const getAllSales = async () => {
    const query = `SELECT sale_id as saleId, date, product_id, quantity FROM StoreManager.sales
    AS sale INNER JOIN sales_products AS prod WHERE sale.id = prod.sale_id`;
    const [result] = await connection.execute(query);
    return result;
};

const getSaleById = async (id) => {
    const query = `SELECT date, product_id, quantity FROM StoreManager.sales
    INNER JOIN StoreManager.sales_products 
    ON sales.id = sales_products.sale_id WHERE sales.id = ?;`;
    const [result] = await connection.execute(query, [id]);
    return result;
};

const getDateSaleId = async (id) => {
    const query = 'SELECT date FROM StoreManager.sales WHERE id=?;';
    const [result] = await connection.execute(query, [id]);
    return result[0].date;
};

const updateSale = async (productId, quantity, saleId) => {
    const query = `UPDATE StoreManager.sales_products 
    SET quantity = ? WHERE product_id = ? AND sale_id = ?`;
    await connection.execute(query, [quantity, productId, saleId]);
    return { productId, quantity };
};

module.exports = {
    insertSaleProduct,
    insertSale,
    listIds,
    getAllSales,
    getSaleById,
    getDateSaleId,
    updateSale,
};