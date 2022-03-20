import { Request, Response } from 'express';
import { createProductService, listProductService } from '../services/productService';
import validProduct from '../validations/productsValidation';

const productCreateController = async (req: Request, res: Response) => {
  try {
    const { name, amount } = req.body;
    const validationProduct = validProduct(req.body);
    if (typeof (validationProduct) === 'object') {
      return res.status(validationProduct.code).json({ error: validationProduct.error });
    }
    const resu = await createProductService(req.body);
    const object = {
      item: {
        id: resu, name, amount,
      },
    };
    res.status(201).json(object);
  } catch (e) {
    res.status(400).json(e);
  }
};

const productListController = async (_req: Request, res: Response) => {
  try {
    const listAll = await listProductService();
    return res.status(200).json(listAll);
  } catch (e) {
    return res.status(400).json(e);
  }
};

export { productCreateController, productListController };