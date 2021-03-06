/* eslint-disable import/prefer-default-export */
import chalk from 'chalk';
import { ObjectId } from 'mongodb';
import dayjs from 'dayjs';

import db from '../db.js';


// eslint-disable-next-line consistent-return
export async function getHistory(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '').trim();

    if (!token) return res.sendStatus(401);

    try {
        const session = await db.collection('sessions').findOne({ token });

        if (!session) return res.sendStatus(401);

        const user = await db.collection('users').findOne({ _id: new ObjectId(session.userId) });

        if (!user) return res.sendStatus(404);

        delete user.password;

        res.status(200).send(user);
    } catch (e) {
        console.log(chalk.bold.red('Erro no get history', e));
        res.status(422).send(e);
    }
};

export async function setNewIncome(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '').trim();

    if (!token) return res.sendStatus(401);

    const objToPush = {...req.body, date: dayjs().format('DD/MM'), _id: new ObjectId()};

    try {
        const session = await db.collection('sessions').findOne({ token });

        if (!session) return res.sendStatus(401);

        const updateUser = await db.collection('users').updateOne({ _id: new ObjectId(session.userId) }, {$push: {transactions: objToPush}});
        const user = await db.collection('users').findOne({ _id: new ObjectId(session.userId) });

        if (!updateUser) return res.sendStatus(404);

        res.status(201).send(user.transactions);
    } catch (e) {
        console.log(chalk.bold.red('Erro no post income', e));
        res.status(422).send(e);
    }
};

export async function setNewOutcome(req, res) {
    const { authorization } = req.headers;

    const token = authorization?.replace('Bearer', '').trim();

    if (!token) return res.sendStatus(401);

    const objToPush = {...req.body, date: dayjs().format('DD/MM'), _id: new ObjectId()};

    try {
        const session = await db.collection('sessions').findOne({ token });

        if (!session) return res.sendStatus(401);

        const updateUser = await db.collection('users').updateOne({ _id: new ObjectId(session.userId) }, {$push: {transactions: objToPush}});
        const user = await db.collection('users').findOne({ _id: new ObjectId(session.userId) });

        if (!updateUser) return res.sendStatus(404);

        res.status(201).send(user.transactions);
    } catch (e) {
        console.log(chalk.bold.red('Erro no post outcome', e));
        res.status(422).send(e);
    }
};

export async function deleteTransaction(req, res) {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '').trim();

        if (!token) return res.sendStatus(401);

    const {transactionId} = req.params;

    try {

        const session = await db.collection('sessions').findOne({ token });
        if (!session) return res.sendStatus(422);

        const user = await db.collection('users').findOne({ _id: new ObjectId(session.userId) });
        if (!user) return res.sendStatus(404);

        const update = await db.collection('users').updateOne({_id: new ObjectId(user._id)}, {$pull: {transactions: {_id: new ObjectId(transactionId)}}}, true, false);
        if (!update) return res.sendStatus(404);

        const userToPost = await db.collection('users').findOne({ _id: new ObjectId(session.userId) });

        res.status(200).send(userToPost.transactions);
    } catch (e) {
        console.log(chalk.bold.red('Erro no delete transaction', e));
        res.status(422).send(e);
    }
}