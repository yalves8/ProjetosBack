const productModel = require('../models/productModel');

const createProductService = async ({ name, quantity }) => {
    const { id } = await productModel.createProduct({ name, quantity });
    return { id };
};

const validName = async ({ name }) => {
    const validation = await productModel.findProductByName({ name });
    if (!validation) return false;
    return validation;
};

const getAll = async () => {
    const listProduct = await productModel.getAll();
    return listProduct;
};

const findById = async (id) => {
    const findId = await productModel.findById(id);
    if (!findId) return false;
    return findId;
};

const updateProduct = async ({ id, name, quantity }) => {
    const updateProd = await productModel.updateProduct({ id, name, quantity });
    if (updateProd) return true;
    return false;
};

const deleteProduct = async ({ id }) => {
    const deleteProd = await productModel.deleteProduct({ id });
    if (deleteProd) return true;
    return false;
};

module.exports = {
    createProductService,
    validName,
    getAll,
    findById,
    updateProduct,
    deleteProduct,
};
