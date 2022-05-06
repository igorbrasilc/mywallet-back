/* eslint-disable no-useless-return */
import express, {json} from 'express';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes/index';

dotenv.config();

const app = express();

app.use(json());
app.use(cors());
app.use(router);

app.listen(process.env.DOOR, () => {
    console.log(chalk.bold.green('Server on'));
});
