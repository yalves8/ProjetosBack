import jwt from 'jsonwebtoken';
import { DecodeTokenId } from '../interfaces/InterUser';

const generateToken = (userId: number): string => {
  const token = 'secret';
  const createToken = jwt.sign({ userId }, token, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });

  return createToken;
};
const erro1 = 'Token not found';
const erro2 = 'Invalid token';

const validateToken = (userToken: string | never) : DecodeTokenId | string => {
  if (!userToken) {
    return erro1;
  }
  try {
    const decoded = jwt.verify(userToken, 'secret') as DecodeTokenId;
    return decoded;
  } catch (e) {
    return erro2;
  }
};

export { generateToken, validateToken };