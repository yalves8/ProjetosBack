// const saleService = require('../services/saleService');

const findTwoKeysPerObject = (body) => {
    const twoKeys = [];
    body.forEach((key) => {
        twoKeys.push(Object.keys(key).length);
    });
    const result = twoKeys.every((element) => element === 2);
    return (!!result);
};

const validateQuantitySale = (corpo) => {
    const validQuan = corpo.reduce((acc, { quantity }) => {
        if (quantity === undefined) return { code: 400, message: '"quantity" is required' };
        if (typeof quantity !== 'number' || quantity < 1) {
            return {
                code: 422,
                message: '"quantity" must be a number larger than or equal to 1',
            };
        }
        return acc;
    }, {});
    return validQuan;
};

module.exports = { findTwoKeysPerObject, validateQuantitySale };