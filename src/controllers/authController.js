import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import chalk from 'chalk';

import db from '../db.js';

export async function signUpUser(req, res) {
    const { name, email, password } = req.body;

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const objUser = {
        name,
        email,
        password: encryptedPassword,
        income: [],
        outcome: []
    };

    try {
        const participant = await db.collection('users').findOne({ email });

        if (participant) {
            res.status(409).send('Usuário já existe');
            return;
        }

        await db.collection('users').insertOne(objUser);
        res.status(201).send('Usuário criado!');
    } catch (e) {
        res.status(422).send(e);
    }
}

export async function signInUser(req, res) {
    const { email, password } = req.body;

    try {
        const participant = await db.collection('users').findOne({ email });

        if (participant && bcrypt.compareSync(password, participant.password)) {

            const token = uuid();

            await db.collection('sessions').insertOne({
                token,
                // eslint-disable-next-line no-underscore-dangle
                userId: participant._id
            });

            const objUser = { ...participant, token };

            delete objUser.password;

            res.status(200).send(objUser);
            return;
        }

        res.status(404).send('Usuário não encontrado no banco de dados');
    } catch (e) {
        res.status(422).send(e);
        console.log(chalk.bold.red('Erro no post sign-in', e));
    }
}