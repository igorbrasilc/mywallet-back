import {signInSchema, signUpSchema} from '../schemas/authSchemas.js';

export function signInValidation(req, res, next) {
    const user = req.body;

    const validation = signInSchema.validate(user);

    if (validation.error) {
        return res.sendStatus(422);
    }

    next();
}

export function signUpValidation(req, res, next) {
    const user = req.body;

    const validation = signUpSchema.validate(user);

    if (validation.error) {
        return res.sendStatus(422);
    }

    next();
}