import * as express from 'express';
import * as DB from '../../database/DatabaseController';
import IUser from './IUser';
import User from './User';

class UserController {

    constructor() {
    }

    login(req: express.Request, res: express.Response, next: express.NextFunction): void {

    }

    async createUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        const user: IUser = new User(req.body.name, req.body.email);
        try {
            await DB.addUserToDB(user);
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
