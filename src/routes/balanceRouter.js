import express from 'express';

import { getHistory } from '../controllers/balanceController.js';

const balanceRouter = express.Router();

balanceRouter.get('/history', getHistory);

export default balanceRouter;