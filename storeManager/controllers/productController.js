const router = require('express').Router();
const { validateQuantity,
    validateName, createProduct, getAll, findById,
    updateProduct, deleteProduct } = require('../middlewares/productMiddlewares');

router.get('/products', getAll);
router.get('/products/:id', findById);
router.post('/products', [validateName, validateQuantity, createProduct]);
router.put('/products/:id', [validateName, validateQuantity, updateProduct]);
router.get('/products/:id', findById);
router.delete('/products/:id', deleteProduct);

module.exports = router;