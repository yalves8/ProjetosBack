const router = require('express').Router();
const userController = require('../controllers/userController');
const blogPostController = require('../controllers/blogPostController');

router.get('/post/search', userController.validToken, blogPostController.searchPost);
router.post('/post', userController.validToken, blogPostController.create);
router.get('/post', userController.validToken, blogPostController.listPosts);
router.get('/post/:id', userController.validToken, blogPostController.listPostById);
router.put('/post/:id', userController.validToken, blogPostController.updatePost);
router.delete('/post/:id', userController.validToken, blogPostController.deletePost);

module.exports = router;