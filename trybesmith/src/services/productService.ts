import { createProduct, listProducts } from '../models/productModel';
import { CadProd } from '../interfaces/InterProduct';

const createProductService = async (product: CadProd) => createProduct(product);
const listProductService = async () => listProducts();

export { createProductService, listProductService };