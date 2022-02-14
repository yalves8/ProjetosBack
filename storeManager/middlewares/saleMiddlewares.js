const moment = require('moment');
const Promisse = require('promise');
const saleService = require('../services/saleService');
// const sale1 = require('../models/saleModel');
const schema = require('../schemas/productSchemas');
const saleSchema = require('../schemas/saleSchemas');

const validateProductId = (req, res, next) => {
    let findN = '';
    req.body.forEach((key) => {
        if (!key.product_id) {
            findN = schema.validateProductId(key.product_id);
        }
        return true;
    });
    if (findN.message) return res.status(findN.code).json({ message: findN.message });
    next();
};

const validateId = async (req, res, next) => {
    const listIds = [];

    req.body.forEach((e) => listIds.push(e.product_id));
    const listNew = listIds.filter((este, i) => listIds.indexOf(este) === i);
    const result = await saleService.listIds();
    const teste = result.map((i) => i.id);
    const a = listNew.map((o) => teste.includes(o));

    if (a.includes(false)) return res.status(404).json({ message: 'Product not found' });
    next();
};

const validateQuantityReturn = (req, res, next) => {
    const ret = saleSchema.validateQuantitySale(req.body);
    if (ret.code) return res.status(ret.code).json({ message: ret.message });
    next();
};

const createSaleProduct = async (req, res) => {
    const nowData = moment().format('YYYY-MM-DD HH:mm:ss');
    const stringData = nowData.toString();
    const insert = await saleService.insertSale(stringData);

    const teste = req.body.map(async (key) => {
        if (key.product_id && key.quantity) {
            const result = await saleService
                .insertSaleProduct(insert.id, key.product_id, key.quantity);
            return result;
        }
    });
    const data = await Promisse.all(teste);
    return res.status(201).json({ id: data[0].saleId, itemsSold: req.body });
};

const getAllSales = async (_req, res) => {
    const result = await saleService.getAllSales();
    return res.status(200).json(result);
};

const getSaleByIds = async (req, res) => {
    const { id } = req.params;
    const resultId = await saleService.getSaleById(id);
    if (resultId.code) return res.status(resultId.code).json({ message: resultId.message });
    return res.status(200).json(resultId);
};

const updateSales = async (req, res) => {
    const { id } = req.params;
    const searchProductBody = req.body.map((ret) => {
        const prod = ret.product_id;
        return prod;
    });
    const [returnProd, returnSale] = await Promisse.all(
        [schema.findId(searchProductBody[0]), saleService.getSaleById(id)],
    );
    if (returnProd.code) return res.status(returnProd.code).json({ message: returnProd.message });
    if (returnSale.code) return res.status(returnSale.code).json({ message: returnSale.message });
    await saleService.updateSale(id, req.body);
    return res.status(200).json({ saleId: id, itemUpdated: req.body });
};
module.exports = {
    validateQuantityReturn,
    createSaleProduct,
    validateProductId,
    validateId,
    getAllSales,
    getSaleByIds,
    updateSales,
};