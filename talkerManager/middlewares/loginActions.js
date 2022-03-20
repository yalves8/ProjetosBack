const { readFile } = require('./filesAction');

const findId = (idFind) => {
    const testFind = readFile().then((content) => {
        const testId = content.find((talker) => talker.id === Number(idFind));
        return testId;
    });
    return testFind;
};

function geraTokenAleatorio() {
    let tokenAleatorio = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i += 1) {
        tokenAleatorio += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return tokenAleatorio;
}

function validateEmail(req, res, next) {
    const { email } = req.body;
    const MAIL_REGEX = /\S+@\S+\.\S+/;
    if (!email) {
        return res.status(400)
            .json({ message: 'O campo "email" é obrigatório' });
    }
    if (!email.match(MAIL_REGEX)) {
        return res.status(400)
            .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
}

function validadePassword(req, res, next) {
    const { password } = req.body;
    if (!password) {
        return res.status(400)
            .json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(400)
            .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
}

module.exports = { findId, geraTokenAleatorio, validateEmail, validadePassword };