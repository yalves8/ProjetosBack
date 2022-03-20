import { CadProd } from '../interfaces/InterProduct';
import { schemaCadProd } from './schemasJoi';

const validProduct = (product: CadProd) => {
  const { error } = schemaCadProd.validate(product);
  if (error) {
    const errosString = error.details[0];
    if (errosString.type === 'any.required') {
      return { code: 400, error: errosString.message };
    }
    return { code: 422, error: errosString.message };
  }
};
export default validProduct;