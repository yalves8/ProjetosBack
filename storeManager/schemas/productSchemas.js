const productService = require('../services/productService');

const erros = {
    nameBlank: '"name" is required',
    nameWrongLength: '"name" length must be at least 5 characters long',
    nameExists: 'Product already exists',
    quantityBlank: '"quantity" is required',
    quantityWrongLength: '"quantity" must be a number larger than or equal to 1',
    idNotFound: 'Product not found',
    productIdBlank: '"product_id" is required',
};

const blank = (value) => (!value);
const length = (value, min) => (value.length < min);
const typeProperty = (value, type) => (type === 'string' ? typeof value !== 'string'
    : typeof value !== 'number');
const codeBlank = 400;
const codeLength = 422;
const codeIdNotFound = 404;

const nameValidation = ({ name }) => {
    if (blank(name)) return { code: codeBlank, message: erros.nameBlank };
    if (length(name, 5)) return { code: codeLength, message: erros.nameWrongLength };
    return {};
};

const quantityValidation = ({ quantity }) => {
    if (blank(quantity) && quantity !== 0) return { code: codeBlank, message: erros.quantityBlank };
    if (typeProperty(quantity, 'number')) {
        return {
            code: codeLength, message: erros.quantityWrongLength,
        };
    }
    if (quantity < 1) return { code: codeLength, message: erros.quantityWrongLength };
    return {};
};

const findId = async (id) => {
    const find = await productService.findById(id);
    if (!find) return { code: codeIdNotFound, message: erros.idNotFound };
    return find;
};

const fiD = async (id) => {
    const find = await productService.findById(id);
    if (!find) return false;
    return true;
};

const validateProductId = (productId) => {
    try {
        if (blank(productId)) return { code: codeBlank, message: erros.productIdBlank };
        /* const findIdProduct = await productService.findById(productId);
        if (!findIdProduct) return { code: codeIdNotFound, message: erros.idNotFound }; */
    } catch (error) {
        console.error(error);
    }

    return {};
};

module.exports = { nameValidation, quantityValidation, findId, validateProductId, fiD };