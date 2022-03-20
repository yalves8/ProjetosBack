import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../authorization/token';
import { User } from '../interfaces/InterUser';
import { schemaLogin } from './schemasJoi';

export function validationLogin(login: User) {
  const { error } = schemaLogin.validate(login);
  if (error) {
    const errosString = error.details[0];
    if (errosString.type === 'any.required') {
      return { code: 400, error: errosString.message };
    }
    return { code: 401, error: errosString.message };
  }
}

export function validationUser(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers as never;
  const check = validateToken(authorization);
  if (typeof (check) === 'string') return res.status(401).json({ error: check });
  next();
}