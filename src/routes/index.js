import express from 'express';
import authRouter from './authRouter';
import balanceRouter from './balanceRouter';

const router = express.Router();
router.use(authRouter);
router.use(balanceRouter);

export default router;