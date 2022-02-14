require('dotenv').config();
const jwt = require('jsonwebtoken');

const tokenJwt = process.env.JWT_SECRET;

const generateToken = (user) => {
    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };
    const token = jwt.sign({ data: user }, tokenJwt, jwtConfig);
    return token;
};

const validateToken = (token) => {
    if (!token) {
        return { code: 401, message: 'Token not found' };
    }
    const decoded = jwt.verify(token, tokenJwt);
    return decoded;
};

const decodeToken = (data) => (jwt.decode(data).data.id);

module.exports = { generateToken, validateToken, decodeToken };