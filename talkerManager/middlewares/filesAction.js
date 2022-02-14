const fs = require('fs').promises;

const readFile = () => fs.readFile('./talker.json', 'utf8')
    .then((content) => JSON.parse(content));

function updateJson(arq) {
    return fs.writeFile('./talker.json', JSON.stringify(arq));
}

module.exports = { readFile, updateJson };