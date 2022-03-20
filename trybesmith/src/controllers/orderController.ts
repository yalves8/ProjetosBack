import { Request, Response } from 'express';
import { createOrderService, verifyArrayService } from '../services/orderService';
import { validateToken } from '../authorization/token';
import { DecodeTokenId } from '../interfaces/InterUser';
import orderValidation from '../validations/orderValidation';

const createOrderController = async (req: Request, res: Response) => {
  const { authorization } = req.headers as never;
  const { products } = req.body;
  const validationProduct = orderValidation(products);
  if (typeof (validationProduct) === 'object') {
    return res.status(validationProduct.code).json({ error: validationProduct.error });
  }
  const idToken = validateToken(authorization) as DecodeTokenId;
  const { userId } = idToken;
  const order = await createOrderService(userId);
  await verifyArrayService(products, order);

  return res.status(201).json({
    order: {
      userId,
      products,
    },
  });
};

export default createOrderController;