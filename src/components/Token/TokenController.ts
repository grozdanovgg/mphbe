
import * as express from 'express';
import DB from '../../database/repository';
import Token from './Token';
import * as TokenService from '../Token/TokenService';
import Pool from '../Pool/Pool';

class TokenController {

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

    async getTokenInfo(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {

        try {
            const token: Token = await TokenService.getTokenInfo(req.body.tokenName);
            res.status(200).json(token);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error.message,
                errorStack: error.stack
            });
        }
    }

    async calcBestPool(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        const tokenPoolsNames: string[] = [];
        tokenPoolsNames.push(...req.query);

        res.status(200).json('bestPool');
        // try {
        //     const bestPool: Pool = await TokenService.getBestPool(tokenPools);
        //     res.status(200).json(bestPool);
        // } catch (error) {

        // }
    }




}

export default new TokenController();
