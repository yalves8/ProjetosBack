const blogPostService = require('../services/blogPostService');

const create = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const { title, content, categoryIds } = req.body;
        const createPost = await blogPostService.createBlogPostService(token,
            { title, content, categoryIds });
        if (createPost.message) {
            return res.status(createPost.code).json({
                message: createPost.message,
            });
        }
        return res.status(createPost.code).json(createPost.json);
    } catch (e) {
        console.log(e.message);
    }
};

const listPosts = async (_req, res) => {
    try {
        const listAll = await blogPostService.listPostService();
        return res.status(200).json(listAll);
    } catch (e) {
        console.log(e.message);
    }
};

const listPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const listPost = await blogPostService.listPostByIdService(id);
        if (listPost.message) return res.status(listPost.code).json({ message: listPost.message });
        return res.status(listPost.code).json(listPost.json);
    } catch (e) {
        console.log(e.message);
    }
};

const updatePost = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const { id } = req.params;
        const { title, content, categoryIds } = req.body;
        const upPost = await blogPostService.updatePostService(authorization, id, {
            title, content, categoryIds,
        });
        if (upPost.message) return res.status(upPost.code).json({ message: upPost.message });
        return res.status(upPost.code).json(upPost.json);
    } catch (e) {
        console.log(e.message);
    }
};

const deletePost = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const { id } = req.params;
        const delPost = await blogPostService.deletePostService(authorization, id);
        if (delPost.message) return res.status(delPost.code).json({ message: delPost.message });
        return res.send(delPost.code);
    } catch (e) {
        console.log(e.message);
    }
};

const searchPost = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            const listAll = await blogPostService.listPostService();
            return res.status(200).json(listAll);
        }
        const search = await blogPostService.searchPostService(q);
        if (search.message) return res.status(search.code).json(search.message);
        return res.status(search.code).json(search.message);
    } catch (e) {
        console.log(e.message);
    }
};

module.exports = { create, listPosts, listPostById, updatePost, deletePost, searchPost };