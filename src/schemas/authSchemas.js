import joi from 'joi';

const signInSchema = joi.object({
    email: joi.string().email({ tlds: {allow: false} }).required(),
    password: joi.string().required()
});

const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email({ tlds: {allow: false} }).required(),
    password: joi.string().pattern(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/).required(),
    passwordConfirmation: joi.ref('password')
});

export {signUpSchema, signInSchema};

