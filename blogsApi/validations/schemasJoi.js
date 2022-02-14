const Joi = require('joi');

const messages = {
    nameLength: '"displayName" length must be at least 8 characters long',
    emailFormat: '"email" must be a valid email',
    passLength: '"password" length must be 6 characters long',
};
const schemaUser = Joi.object().keys({
    displayName: Joi.string().required().min(8).message(messages.nameLength),
    email: Joi.string().required().email().message(messages.emailFormat),
    password: Joi.string().required().length(6).message(messages.passLength),
    image: Joi.string(),
});

const schemaLogin = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().length(6),
});

const schemaCategory = Joi.object().keys({
    name: Joi.string().required(),
});

const schemaBlogPost = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number()).required(),
});

const schemaUpdatePost = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
});

module.exports = {
    schemaBlogPost,
    schemaCategory,
    schemaLogin,
    schemaUpdatePost,
    schemaUser,
};