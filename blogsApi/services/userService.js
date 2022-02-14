const validateJoi = require('../validations/validations');
const { User } = require('../models');
const { generateToken, decodeToken } = require('../auxs/token');

const createUserService = async (data, { email }) => {
    const validate = await validateJoi.register(data);
    if (validate.error) return { code: 400, message: validate.error.details[0].message };
    const findUser = await User.findOne({
        where: { email },
    });
    if (findUser) return { code: 409, message: 'User already registered' };
    const createUser = await User.create(data);
    const token = generateToken(createUser.dataValues);
    return { token };
};

const loginService = async (data) => {
    const validate = await validateJoi.login(data);
    if (validate.error) return { code: 400, message: validate.error.details[0].message };
    const findUser = await User.findOne({
        where: data,
    });
    if (!findUser) return { code: 400, message: 'Invalid fields' };
    const token = generateToken(findUser);
    return { token };
};

const listUsersService = async () => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] },
    });
    if (!users) throw Error;
    return users;
};

const listByIdService = async (id) => {
    try {
        const userId = await User.findOne({
            where: { id },
            attributes: { exclude: ['password'] },
        });
        if (!userId) return { code: 404, message: 'User does not exist' };
        return userId;
    } catch (e) {
        console.log(e.message);
    }
};

const deleteUserService = async (auth) => {
    try {
        const token = decodeToken(auth);
        await User.destroy({
            where: { id: token },
        });
        return { code: 204 };
    } catch (e) {
        console.log(e.message);
    }
};

module.exports = {
    createUserService,
    loginService,
    listUsersService,
    listByIdService,
    deleteUserService,
};