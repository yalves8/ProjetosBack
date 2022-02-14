const moment = require('moment');
const { Op } = require('sequelize');
const validateJoi = require('../validations/validations');
const { BlogPost, Category, User } = require('../models');
const { decodeToken } = require('../auxs/token');

const createBlogPostService = async (auth, { title, content, categoryIds }) => {
    const validCreate = await validateJoi.blogPost({ title, content, categoryIds });
    if (validCreate.message) return validCreate; // valido objeto
    const token = decodeToken(auth); // id do token
    const nowData = moment().format('YYYY-MM-DD HH:mm:ss'); // momento atual
    const findCategory = await Promise.all(categoryIds.map(async (category) => {
        const result = await Category.findByPk(category);
        if (result === null) return null;
    }));
    if (findCategory.includes(null)) return { code: 400, message: '"categoryIds" not found' };
    const create = await BlogPost.create({
        title, content, userId: token, published: nowData, updated: nowData,
    });

    return { code: 201, json: { id: create.id, userId: create.userId, title, content } };
};

const listPostService = async () => {
    const posts = await BlogPost.findAll({
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });
    return posts;
};

const listPostByIdService = async (id) => {
    const listPost = await BlogPost.findByPk(id, {
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });
    if (!listPost) return { code: 404, message: 'Post does not exist' };
    return { code: 200, json: listPost };
};

const findForActions = async (idAuth, id) => {
    const findPost = await BlogPost.findOne({
        where: [{ userId: idAuth, id }, { id }],
        include: [
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
        attributes: { exclude: ['published', 'updated'] },
    });
    if (!findPost) return false;
    return findPost;
};

const updatePostService = async (auth, id, { title, content, categoryIds }) => {
    try {
        const validPost = await validateJoi.updatePostValidation({ title, content, categoryIds });
        if (validPost.message) return validPost;
        const token = decodeToken(auth);
        const checkPost = await findForActions(token, id);
        if (!checkPost) return { code: 401, message: 'Unauthorized user' };
        checkPost.title = title;
        checkPost.content = content;
        await checkPost.save();
        return { code: 200, json: checkPost };
    } catch (e) {
        console.log(e.message);
    }
};

const deletePostService = async (auth, id) => {
    try {
        const token = decodeToken(auth);
        const checkPost = await findForActions(token, id);
        const existPost = await listPostByIdService(id);
        if (existPost.message) return existPost;
        if (!checkPost) return { code: 401, message: 'Unauthorized user' };
        await BlogPost.destroy({
            where: { id },
        });
        return { code: 204 };
    } catch (e) {
        console.log(e.message);
    }
};

const searchPostService = async (search) => {
    try {
        const searchPost = await BlogPost.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.substring]: search } },
                    { content: { [Op.substring]: search } },
                ],
            },
            include: [
                { model: User, as: 'user', attributes: { exclude: ['password'] } },
                { model: Category, as: 'categories', through: { attributes: [] } },
            ],
        });
        if (!searchPost) return { code: 200, message: [] };
        return { code: 200, message: searchPost };
    } catch (e) {
        console.log(e.message);
    }
};

module.exports = {
    createBlogPostService,
    listPostService,
    listPostByIdService,
    updatePostService,
    deletePostService,
    searchPostService,
};