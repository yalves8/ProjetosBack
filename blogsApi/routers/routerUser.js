const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/user', userController.createUser);
router.get('/user', userController.validToken, userController.listUsers);
router.get('/user/:id', userController.validToken, userController.listById);
router.delete('/user/me', userController.validToken, userController.deleteUser);

module.exports = router;