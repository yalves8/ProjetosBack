const { schemaUser, 
    schemaBlogPost, 
    schemaCategory, schemaLogin, schemaUpdatePost } = require('./schemasJoi');

const register = async (data) => {
    const validate = schemaUser.validate(data);
    return validate;
};

const login = async (data) => {
    const validateLogin = schemaLogin.validate(data);
    return validateLogin;
};

const category = async (data) => {
    const validateCategory = schemaCategory.validate(data);
    if (validateCategory.error) {
        return {
            code: 400,
            message: validateCategory.error.details[0].message,
        };
    }
    return validateCategory;
};

const blogPost = async (data) => {
    const validBlogPost = schemaBlogPost.validate(data);
    if (validBlogPost.error) {
        return {
            code: 400,
            message: validBlogPost.error.details[0].message,
        };
    }
    return validBlogPost;
};

const updatePostValidation = async ({ title, content, categoryIds }) => {
     if (categoryIds) {
        return {
            code: 400,
            message: 'Categories cannot be edited',
        };
    }
    const validPost = schemaUpdatePost.validate({ title, content });
   
    if (validPost.error) {
        return {
            code: 400,
            message: validPost.error.details[0].message,
        };
    }
    return validPost;
};

module.exports = { register, login, category, blogPost, updatePostValidation };