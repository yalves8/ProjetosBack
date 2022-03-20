import { Request, Response } from 'express';
import { User } from '../interfaces/InterUser';
import { validationLogin } from '../validations/loginValidation';
import { createUserService, loginService } from '../services/userService';
import { generateToken } from '../authorization/token';
import userCreateValidation from '../validations/userValidation';

const userCreateController = async (req: Request, res: Response) => {
  const validationUser = userCreateValidation(req.body);
  if (typeof (validationUser) === 'object') {
    return res.status(validationUser.code).json({ error: validationUser.error });
  }

  const resu = await createUserService(req.body);
  const token = generateToken(resu);
  return res.status(201).json({ token });
};

const loginController = async (req: Request, res: Response) => {
  try {
    const validLogin = validationLogin(req.body);
    if (typeof (validLogin) === 'object') {
      return res.status(validLogin.code).json({ error: validLogin.error });
    }

    const resu = await loginService(req.body) as User[];
    const resuId = resu[0].id;
    const token = generateToken(resuId);
    return res.status(200).json({ token });
  } catch (e) {
    res.status(401).json({ error: 'Username or password invalid' });
  }
};

export { userCreateController, loginController };