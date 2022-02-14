const categoryService = require('../services/categoryService');

const create = async (req, res) => {
    try {
        const { name } = req.body;
        const createCa = await categoryService.createCategory(req.body, { name });
        if (createCa.message) return res.status(createCa.code).json({ message: createCa.message });
        return res.status(createCa.code).json(createCa.json);
    } catch (e) {
        console.log(e.message);
    }
};

const listCategory = async (_req, res) => {
    try {
        const getCategories = await categoryService.listCategories();
        return res.status(200).json(getCategories);
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = { create, listCategory };