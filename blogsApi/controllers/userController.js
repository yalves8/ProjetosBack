const userService = require('../services/userService');
const tokenValidation = require('../auxs/token');

const createUser = async (req, res) => {
    try {
        const data = req.body;
        const { email } = req.body;
        const newUser = await userService.createUserService(data, { email });
        if (newUser.message) return res.status(newUser.code).json({ message: newUser.message });
        return res.status(201).json(newUser);
    } catch (error) {
        console.log(error.message);
    }
};

const login = async (req, res) => {
    try {
        const data = req.body;
        const newUser = await userService.loginService(data);
        if (newUser.message) return res.status(newUser.code).json({ message: newUser.message });
        return res.status(200).json(newUser);
    } catch (error) {
        console.log(error.message);
    }
};

const listUsers = async (_req, res) => {
    try {
        const getUsers = await userService.listUsersService();
        return res.status(200).json(getUsers);
    } catch (error) {
        console.log(error.message);
    }
};

const validToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const check = tokenValidation.validateToken(token);
        if (check.message) return res.status(check.code).json({ message: check.message });
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

const listById = async (req, res) => {
    try {
        const { id } = req.params;
        const findUser = await userService.listByIdService(id);
        if (findUser.message) return res.status(findUser.code).json({ message: findUser.message });
        res.status(200).json(findUser);
    } catch (e) {
        console.log(e.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const delUser = await userService.deleteUserService(authorization);
        res.send(delUser.code);
    } catch (e) {
        console.log(e.message);
    }
};

module.exports = { createUser, login, listUsers, validToken, listById, deleteUser };