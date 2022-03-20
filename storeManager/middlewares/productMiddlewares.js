const productService = require('../services/productService');
const schema = require('../schemas/productSchemas');

const createProduct = async (req, res) => {
    const { name, quantity } = req.body;

    const create = await productService.createProductService({ name, quantity });

    return res.status(201).json({ id: create.id, name, quantity });
};

const validateName = async (req, res, next) => {
    const { name } = req.body;
    const { id } = req.params;
    const validName = schema.nameValidation({ name });
    if (validName.message) return res.status(validName.code).json({ message: validName.message });
    if (!id) {
        const nameExist = await productService.validName({ name });
        if (nameExist) return res.status(409).json({ message: 'Product already exists' });
    }

    next();
};

const validateQuantity = (req, res, next) => {
    const { quantity } = req.body;

    const valid = schema.quantityValidation({ quantity });
    if (valid.message) return res.status(valid.code).json({ message: valid.message });
    next();
};

const getAll = async (_req, res) => {
    const list = await productService.getAll();
    return res.status(200).json(list);
};

const findById = async (req, res) => {
    const { id } = req.params;
    const findId = await schema.findId(id);
    if (findId.message) return res.status(findId.code).json({ message: findId.message });
    return res.status(200).json(findId);
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const findId = await schema.findId(id);
    if (findId.message) return res.status(findId.code).json({ message: findId.message });
    const updateProd = await productService.updateProduct({ id, name, quantity });
    if (updateProd) return res.status(200).json({ id, name, quantity });
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const findIdProduct = await schema.findId(id);
    if (findIdProduct.message) {
        return res.status(findIdProduct.code)
            .json({ message: findIdProduct.message });
    }
    const deleteProd = await productService.deleteProduct({ id });
    if (deleteProd) return res.status(200).json(findIdProduct);
};

module.exports = {
    createProduct,
    validateName,
    validateQuantity,
    getAll,
    findById,
    updateProduct,
    deleteProduct,
};