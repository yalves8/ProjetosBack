const router = require('express').Router();
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');

router.post('/categories', userController.validToken, categoryController.create);
router.get('/categories', userController.validToken, categoryController.listCategory);

module.exports = router;