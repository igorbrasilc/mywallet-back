import joi from 'joi';

const transactionSchema = joi.object({
    type: joi.string().valid('income', 'outcome').required(),
    value: joi.number().required(),
    description: joi.string().max(20).required()
});

export {transactionSchema};