const connection = require('./connection');

const createProduct = async ({ name, quantity }) => {
    const [result] = await connection.execute(
        'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)', [name, quantity],
    );
    return { id: result.insertId };
};

const findProductByName = async ({ name }) => {
    const query = 'SELECT * FROM StoreManager.products WHERE name=?';
    const [result] = await connection.execute(query, [name]);
    return result[0];
};

const getAll = async () => {
    const [result] = await connection.execute('SELECT * FROM StoreManager.products');
    return result;
};

const findById = async (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id=?';
    const [result] = await connection.execute(query, [id]);
    return result[0];
};

const updateProduct = async ({ id, name, quantity }) => {
    const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE (id = ?)';
    try {
        await connection.execute(query, [name, quantity, id]);
        return true;
    } catch (error) {
        return console.error(`Erro: ${error}`);
    }
};

const deleteProduct = async ({ id }) => {
    const query = 'DELETE FROM StoreManager.products WHERE id=?';
    try {
        await connection.execute(query, [id]);
        return true;
    } catch (error) {
        return console.error(`Erro: ${error}`);
    }
};

module.exports = {
    createProduct,
    findProductByName,
    getAll,
    findById,
    updateProduct,
    deleteProduct,
};
