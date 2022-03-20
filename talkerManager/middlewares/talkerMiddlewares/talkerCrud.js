const { readFile, updateJson } = require('../filesAction');

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

module.exports = { createUser, editUser, deleteUser, searchTalk };