import {transactionSchema} from '../schemas/balanceSchemas.js';

export function transactionValidation(req, res, next) {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '').trim();

    if (!token) return res.sendStatus(401);

    const validation = transactionSchema.validate(req.body);

    if (validation.error) {
        return res.sendStatus(422);
    }

    next();
}