
import * as express from 'express';
import DB from '../../database/repository';
import Token from './Token';

class TokenController {
    // public getUser(req: express.Request, res: express.Response, next: express.NextFunction): void {

    // }

    // public createUser(req: express.Request, res: express.Response, next: express.NextFunction): void {

    // }

    addToken = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        const token: Token = new Token(req.body.tokenName);

        try {
            await DB.setDocInSubcol('users', req.body.username, 'tokens', token.name, token);
            res.status(200).json(token);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error.message,
                errorStack: error.stack
            });
        }
    }


}

export default new TokenController();
