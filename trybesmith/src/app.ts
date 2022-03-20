import express from 'express';
import { userCreateController, loginController } from './controllers/userController';
import { productCreateController, productListController } from './controllers/productController';
import { validationUser } from './validations/loginValidation';
import createOrderController from './controllers/orderController';

const app = express();

app.use(express.json());

app.post('/users', userCreateController);
app.post('/login', loginController);

// product
app.post('/products', validationUser, productCreateController);
app.get('/products', validationUser, productListController);
app.post('/orders', validationUser, createOrderController);
export default app;
