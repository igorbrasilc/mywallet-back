import express from 'express';

import { getHistory, setNewIncome, setNewOutcome, deleteTransaction } from '../controllers/balanceController.js';
import {transactionValidation} from '../middlewares/balanceMiddlewares.js';

const balanceRouter = express.Router();

balanceRouter.get('/history', getHistory);
balanceRouter.post('/new-income', transactionValidation, setNewIncome);
balanceRouter.post('/new-outcome', transactionValidation, setNewOutcome);
balanceRouter.delete('/delete/:transactionId', deleteTransaction);

export default balanceRouter;