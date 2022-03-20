/* const bodyParser = require('body-parser');
const express = require('express');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const blogPostController = require('./controllers/blogPostController');

const app = express();
app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.post('/login', userController.login);
app.post('/user', userController.createUser);
app.get('/user', userController.validToken, userController.listUsers);
app.get('/user/:id', userController.validToken, userController.listById);
app.delete('/user/me', userController.validToken, userController.deleteUser);
app.get('/post/search', userController.validToken, blogPostController.searchPost);

app.post('/categories', userController.validToken, categoryController.create);
app.get('/categories', userController.validToken, categoryController.listCategory);
app.post('/post', userController.validToken, blogPostController.create);
app.get('/post', userController.validToken, blogPostController.listPosts);
app.get('/post/:id', userController.validToken, blogPostController.listPostById);
app.put('/post/:id', userController.validToken, blogPostController.updatePost);
app.delete('/post/:id', userController.validToken, blogPostController.deletePost);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
 */

const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routers/routerUser');
const categoryRouter = require('./routers/routerCategory');
const blogPostRouter = require('./routers/routerBlogPost');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use('/', userRouter);
app.use('/', categoryRouter);
app.use('/', blogPostRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
