const validateJoi = require('../validations/validations');
const { Category } = require('../models');

const createCategory = async (data, { name }) => {
    const validate = await validateJoi.category(data);
    if (validate.message) return validate;
    await Category.create(data);
    const findLast = await Category.findOne({ where: { name } });
    return { code: 201, json: findLast };
};

const listCategories = async () => {
    const categories = await Category.findAll();
    if (!categories) throw Error;
    return categories;
};

module.exports = { createCategory, listCategories };