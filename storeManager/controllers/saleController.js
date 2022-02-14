const router = require('express').Router();
const { createSaleProduct, validateProductId,
    validateQuantityReturn,
    validateId, getAllSales,
    getSaleByIds, updateSales } = require('../middlewares/saleMiddlewares');

router.get('/sales', getAllSales);
router.get('/sales/:id', getSaleByIds);
router.post('/sales', [validateProductId, validateQuantityReturn, validateId, createSaleProduct]);
router.put('/sales/:id', validateProductId, validateQuantityReturn, updateSales);

module.exports = router;