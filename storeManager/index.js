const express = require('express');
const bodyParser = require('body-parser');
const productRouter = require('./controllers/productController');
const saleRouter = require('./controllers/saleController');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use('/', productRouter);
app.use('/', saleRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
