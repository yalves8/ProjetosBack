const Promisse = require('promise');
const saleModel = require('../models/saleModel');

const insertSale = async (date) => {
    const { id } = await saleModel.insertSale(date);
    return { id };
};

const insertSaleProduct = async (saleIds, productIdS, quantityS) => {
    const { saleId, productId, quantity } = await saleModel
        .insertSaleProduct(saleIds, productIdS, quantityS);
    return { saleId, productId, quantity };
};

const listIds = async () => {
    const result = await saleModel.listIds();
    return result;
};

const getAllSales = async () => {
    const listSales = await saleModel.getAllSales();
    if (!listSales) return false;
    return listSales;
};

const getSaleById = async (id) => {
    const findId = await saleModel.getSaleById(id);
    if (findId.length === 0) return { code: 404, message: 'Sale not found' };
    return findId;
};

const getDateSaleId = async (id) => {
    const findDate = await saleModel.getDateSaleId(id);
    if (!findDate) return false;
    return findDate;
};

const updateSale = async (id, corpo) => {
    const teste = corpo.map(async (ret) => {
        const up = await saleModel.updateSale(ret.product_id, ret.quantity, id);
        return up;
    });
    const cathProm = await Promisse.all(teste);
    return cathProm;
};

module.exports = {
    insertSale,
    insertSaleProduct,
    listIds,
    getAllSales, 
    getSaleById,
    getDateSaleId,
    updateSale,
};