import express from 'express';
import authRouter from './authRouter.js';
import balanceRouter from './balanceRouter.js';

const router = express.Router();
router.use(authRouter);
router.use(balanceRouter);

export default router;