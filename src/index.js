import express, {json} from 'express';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.listen(process.env.DOOR, () => {
    console.log(chalk.bold.green('Server on'));
})
