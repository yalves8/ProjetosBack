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

module.exports = {
    validadeTalk,
    validateAge,
    validateDateRate,
    validateToken,
    validateName,
};