import joi from 'joi';

const transactionSchema = joi.object({
    type: joi.string().valid('income', 'outcome').required(),
    value: joi.number().required(),
    description: joi.string().required()
});

export {transactionSchema};