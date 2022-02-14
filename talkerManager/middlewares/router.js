const router = require('express').Router();

const { readFile } = require('./filesAction');

const { geraTokenAleatorio,
  validateEmail,
  validadePassword,
  findId } = require('./loginActions');

const { validadeTalk,
  validateAge,
  validateName,
  validateToken,
  validateDateRate } = require('./talkerMiddlewares/talkerValidations');

const { createUser,
  editUser,
  deleteUser,
  searchTalk } = require('./talkerMiddlewares/talkerCrud');

router.get('/talker/search', validateToken, searchTalk);

router.get('/talker', (_req, res) => {
  const readTalker = readFile().then((content) => res.status(200).json(content))
    .catch((_err) => res.status(200).json([]));
  return readTalker;
});

router.post('/login', validadePassword, validateEmail, (_req, res) => {
  const randomToken = geraTokenAleatorio();
  res.status(200).json({ token: randomToken });
});

router.post('/talker', validateToken,
  validateName,
  validateAge,
  validadeTalk,
  validateDateRate,
  createUser);

router.put('/talker/:id', validateToken,
  validateName, validateAge, validadeTalk,
  validateDateRate, editUser);

router.delete('/talker/:id', validateToken, deleteUser);

router.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const fiD = findId(id).then((content) => {
    if (!content) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(content);
  });
  return fiD;
});

module.exports = router;