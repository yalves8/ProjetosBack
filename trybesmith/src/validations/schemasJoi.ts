import Joi from 'joi';

const userRequired = 'Username is required';
const passRequired = 'Password is required';
const levelRequired = 'Level is required';
const classeRequired = 'Classe is required';
const nameRequired = 'Name is required';
const amountRequired = 'Amount is required';

const schemaUser = Joi.object().keys({
  username: Joi.string().required().min(3).messages({
    'any.required': userRequired,
    'string.empty': userRequired,
    'string.base': 'Username must be a string',
    'string.min': 'Username must be longer than 2 characters',
  }),
  classe: Joi.string().required().min(3).messages({
    'any.required': classeRequired,
    'string.empty': classeRequired,
    'string.min': 'Classe must be longer than 2 characters',
    'string.base': 'Classe must be a string',
  }),
  level: Joi.number().strict().required().min(1)
    .messages({
      'any.required': levelRequired,
      'number.empty': levelRequired,
      'number.min': 'Level must be greater than 0',
      'number.base': 'Level must be a number',
    }),
  password: Joi.string().required().min(8).messages({
    'any.required': passRequired,
    'string.empty': passRequired,
    'string.min': 'Password must be longer than 7 characters',
    'string.base': 'Password must be a string',
  }),
});

const schemaLogin = Joi.object().keys({
  username: Joi.string().required().messages({
    'any.required': userRequired,
    'string.empty': userRequired,
  }),
  password: Joi.string().required().messages({
    'any.required': passRequired,
    'string.empty': passRequired,
  }),
});

const schemaCadProd = Joi.object().keys({
  name: Joi.string().required().min(3).messages({
    'any.required': nameRequired,
    'string.empty': nameRequired,
    'string.base': 'Name must be a string',
    'string.min': 'Name must be longer than 2 characters',
  }),
  amount: Joi.string().required().min(3).messages({
    'any.required': amountRequired,
    'string.empty': amountRequired,
    'string.base': 'Amount must be a string',
    'string.min': 'Amount must be longer than 2 characters',
  }),
});

const products = Joi
  .array()
  .items(Joi.number().strict())
  .strict()
  .required()
  .min(1)
  .messages({
    'any.required': 'Products is required',
    'array.base': 'Products must be an array of numbers',
    'array.min': 'Products can\'t be empty',
  });

export { schemaUser, schemaLogin, schemaCadProd, products };