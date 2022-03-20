import { createOrder, verifyArray } from '../models/orderModel';

const createOrderService = async (idToken: number) => createOrder(idToken);
const verifyArrayService = async (
  idsProduct: number[],
  orderId: number,
) => verifyArray(idsProduct, orderId);

export { createOrderService, verifyArrayService };