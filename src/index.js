/* eslint-disable no-useless-return */
import express, {json} from 'express';
import chalk from 'chalk';
import cors from 'cors';
import {MongoClient, ObjectId} from 'mongodb';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URL);

app.post('/sign-up', async (req, res) => {

    const {name, email, password} = req.body;

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const objUser = {
        name,
        email,
        password: encryptedPassword
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

        await db.collection('users').insertOne(objUser);
        res.status(201).send('Usuário criado!');
        await mongoClient.close();
        console.log(chalk.blue('Mongo Closed'));
    } catch (e) {
        res.status(422).send(e);
        console.log(chalk.bold.red('Erro no post sign-up', e));
        await mongoClient.close();
        console.log(chalk.blue('Mongo Closed'));
    }
    
});

app.post('/sign-in', async (req, res) => {

    const {email, password} = req.body;

    console.log(req.body);

    try {
        await mongoClient.connect();
        console.log(chalk.blue('Mongo Connected'));
        db = mongoClient.db(process.env.DATABASE_NAME);

        const participantSearch = await db.collection('users').findOne({email});
        console.log(participantSearch);

        if (participantSearch && bcrypt.compareSync(password, participantSearch.password)) {
            res.status(200).send(participantSearch);
            console.log(participantSearch);
            await mongoClient.close();
            console.log(chalk.blue('Mongo Closed'));
            return;
        } 

        res.status(404).send('Usuário não encontrado no banco de dados');
        await mongoClient.close();
        console.log(chalk.blue('Mongo Closed'));
    } catch (e) {
        res.status(422).send(e);
        console.log(chalk.bold.red('Erro no post sign-in', e));
        await mongoClient.close();
        console.log(chalk.blue('Mongo Closed'));
    }
    
})

app.listen(process.env.DOOR, () => {
    console.log(chalk.bold.green('Server on'));
})
