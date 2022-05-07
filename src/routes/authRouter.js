import express from 'express';
import { signUpUser, signInUser } from '../controllers/authController.js';
import {signInValidation, signUpValidation} from '../middlewares/authMiddlewares.js';

const authRouter = express.Router();

authRouter.post('/sign-up', signUpValidation, signUpUser);
authRouter.post('/sign-in', signInValidation, signInUser);

export default authRouter;
