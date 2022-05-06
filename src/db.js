import { MongoClient } from 'mongodb';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line import/no-mutable-exports
let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URL);

try {
    await mongoClient.connect();
    console.log(chalk.blue('Mongo Connected'));
    db = mongoClient.db(process.env.DATABASE_NAME);
} catch (e) {
    console.log(chalk.bold.red('Erro ao se conectar ao Mongo', e));
}

export default db;