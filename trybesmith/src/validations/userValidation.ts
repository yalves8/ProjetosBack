import { InterUser } from '../interfaces/InterUser';
import { schemaUser } from './schemasJoi';

const userCreateValidation = (user: InterUser) => {
  const { error } = schemaUser.validate(user);
  if (error) {
    const errosString = error.details[0];
    if (errosString.type === 'any.required') {
      return { code: 400, error: errosString.message };
    }
    return { code: 422, error: errosString.message };
  }
};

export default userCreateValidation;
