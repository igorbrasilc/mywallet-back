import express from 'express';

import { getHistory, setNewIncome } from '../controllers/balanceController.js';
import {incomeValidation} from '../middlewares/balanceMiddlewares.js';

const balanceRouter = express.Router();

balanceRouter.get('/history', getHistory);
balanceRouter.post('/new-income', incomeValidation, setNewIncome);

export default balanceRouter;