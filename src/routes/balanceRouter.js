import express from 'express';

import {getHistory} from '../controllers/balanceController';

const balanceRouter = express.Router();

balanceRouter.get('/history', getHistory);

export default balanceRouter;