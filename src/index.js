/* eslint-disable no-useless-return */
import express, {json} from 'express';
import chalk from 'chalk';
import cors from 'cors';
import {MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URL);

app.post('/sign-up', async (req, res) => {

    const {name, email, password} = req.body;

    const objUser = {
        name,
        email,
        password
    };

    try {
        await mongoClient.connect();
        console.log(chalk.blue('Mongo Connected'));
        db = mongoClient.db(process.env.DATABASE_NAME);

        const participantSearch = await db.collection('users').findOne({email});

        if (participantSearch) {
            res.status(409).send('Usuário já existe');
            return;
        }

        // TODO: encrypt password
        await db.collection('users').insertOne(objUser);
        res.status(201).send('Usuário criado!');
        await mongoClient.close();
        console.log(chalk.blue('Mongo Closed'));
    } catch (e) {
        res.status(422).send(e);
        console.log(chalk.bold.red('Erro no post sign-up', e));
    }
    
})

app.listen(process.env.DOOR, () => {
    console.log(chalk.bold.green('Server on'));
})
