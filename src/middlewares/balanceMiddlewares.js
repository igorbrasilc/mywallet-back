import {incomeSchema} from '../schemas/balanceSchemas.js';

export function incomeValidation(req, res, next) {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '').trim();

    if (!token) return res.sendStatus(401);

    const validation = incomeSchema.validate(req.body);

    if (validation.error) {
        return res.sendStatus(422);
    }

    next();
}