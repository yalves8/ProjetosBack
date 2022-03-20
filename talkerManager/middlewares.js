const fs = require('fs').promises;

const readFile = () => fs.readFile('./talker.json', 'utf8')
    .then((content) => JSON.parse(content));

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

// TALKER MIDDLEWARE

function validateToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token não encontrado' });

    if (token.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    next();
}

function validateName(req, res, next) {
    const { name } = req.body;
    if (!name || name === '') {
        return res.status(400)
            .json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(400)
            .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }

    next();
}

function validateAge(req, res, next) {
    const { age } = req.body;
    if (!age || age === '') {
        return res.status(400)
            .json({ message: 'O campo "age" é obrigatório' });
    }
    if (Number(age) < 18) {
        return res.status(400)
            .json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }

    next();
}

function validadeTalk(req, res, next) {
    const { talk } = req.body;
    if (!talk || !talk.watchedAt || talk.rate === undefined) {
        return res.status(400)
            .json({
                message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
            });
    }

    next();
}

function validateDateRate(req, res, next) {
    const { talk: { watchedAt, rate } } = req.body;
    const dateRegex = /(([1-2][0-9])|([1-9])|(3[0-1]))\/((1[0-2])|(0[1-9]))\/[0-9]{4}/i;
    const teste = dateRegex.test(watchedAt);

    if (!teste && watchedAt !== undefined) {
        return res.status(400)
            .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    if (rate <= 0 || rate > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
}

function updateJson(arq) {
    return fs.writeFile('./talker.json', JSON.stringify(arq));
}

const createUser = async (req, res) => {
    const { name, age, talk } = req.body;
    const leitura = await readFile();
    const newUser = {
        id: leitura.length + 1,
        name,
        age,
        talk,
    };

    leitura.push(newUser);
    await updateJson(leitura);
    res.status(201).json(newUser);
};

const editUser = async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const leitura = await readFile();
    const index = leitura.findIndex((i) => i.id === Number(id));

    leitura[index] = { ...leitura[index], name, age, talk };

    await updateJson(leitura);
    return res.status(200).json(leitura[index]);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const leitura = await readFile();

    const index = leitura.findIndex((i) => i.id === Number(id));

    leitura.splice(index, 1);
    
    await updateJson(leitura);
    return res.status(204).end();
};

const searchTalk = async (req, res) => {
    const { name } = req.query;
    const leitura = await readFile();

    if (!name || name === '') return res.status(200).json(leitura);

    const includeName = leitura.filter((talker) => talker.name.includes(name));

    if (!includeName) return res.status(200).json([]);

    return res.status(200).json(includeName);
};
module.exports = {
    readFile,
    findId,
    validadePassword,
    validateEmail,
    geraTokenAleatorio,
    validateToken,
    validateName,
    validateAge,
    validadeTalk,
    validateDateRate,
    createUser,
    editUser,
    deleteUser,
    searchTalk,
};