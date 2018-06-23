// import UserModel from '../models/UserModel';
import * as express from 'express';
import Token from '../Token/Token';
import DB from '../../database/repository';
import IUser from './IUser';
import User from './User';

class UserController {

    constructor() {
    }

    getUser(req: express.Request, res: express.Response, next: express.NextFunction): void {

    }

    async createUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        const user: IUser = new User(req.body.name, req.body.email);
        try {
            await DB.setDocInCol('users', user.email, user);
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error.message,
                errorStack: error.stack
            });
        }
    }
}

export default new UserController();
