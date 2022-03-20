import { products } from './schemasJoi';

const orderValidation = (product: unknown) => {
  const { error } = products.validate(product);
  if (error) {
    const errosString = error.details[0];    
    if (errosString.type === 'any.required') {
      return { code: 400, error: errosString.message };
    }
    return { code: 422, error: errosString.message };
  }
};

export default orderValidation;