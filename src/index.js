/* eslint-disable no-useless-return */
import express, {json} from 'express';
import chalk from 'chalk';
import cors from 'cors';
import {MongoClient, ObjectId} from 'mongodb';
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';
import dotenv from 'dotenv';

import db from './db.js';

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.post('/sign-up', async (req, res) => {

    const {name, email, password} = req.body;

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const objUser = {
        name,
        email,
        password: encryptedPassword,
        income: [],
        outcome: []
    };

    try {
        const participant = await db.collection('users').findOne({email});

        if (participant) {
            res.status(409).send('Usuário já existe');
            return;
        }

        await db.collection('users').insertOne(objUser);
        res.status(201).send('Usuário criado!');
    } catch (e) {
        res.status(422).send(e);
    }
    
});

app.post('/sign-in', async (req, res) => {

    const {email, password} = req.body;

    try {
        const participant = await db.collection('users').findOne({email});

        if (participant && bcrypt.compareSync(password, participant.password)) {

            const token = uuid();

            await db.collection('sessions').insertOne({
                token,
                // eslint-disable-next-line no-underscore-dangle
                userId: participant._id
            });

            const objUser = {...participant, token};

            delete objUser.password;

            res.status(200).send(objUser);
            return;
        } 

        res.status(404).send('Usuário não encontrado no banco de dados');
    } catch (e) {
        res.status(422).send(e);
        console.log(chalk.bold.red('Erro no post sign-in', e));
    }
    
});

app.get('/history', async (req, res) => {
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer', '').trim();

    if (!token) return res.sendStatus(401);

    try {    
        const session = await db.collection('sessions').findOne({token});
    
        if (!session) return res.sendStatus(401);
    
        const user = await db.collection('users').findOne({_id: session.userId});
    
        if (!user) return res.sendStatus(404);
    
        delete user.password;
    
        res.status(200).send(user);
    } catch (e) {
        res.status(422).send(e);
        console.log(chalk.bold.red('Erro no get history', e));
    }
});

app.listen(process.env.DOOR, () => {
    console.log(chalk.bold.green('Server on'));
})
