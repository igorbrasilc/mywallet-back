/* eslint-disable import/prefer-default-export */
import chalk from 'chalk';

import db from '../db';


// eslint-disable-next-line consistent-return
export async function getHistory(req, res) {
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
        console.log(chalk.bold.red('Erro no get history', e));
        res.status(422).send(e);
    }
};