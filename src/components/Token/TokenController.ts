
import * as express from 'express';
import * as DB from '../../database/DatabaseController';
import Token from './Token';
import * as TokenService from '../Token/TokenService';
import Pool from '../Pool/Pool';
import IPool from '../Pool/IPool';

class TokenController {

    addToken = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        const token: Token = new Token(req.body.tokenName);

        try {
            await DB.addTokenToDb(req.body.username, token);
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

    async getBestPool(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {

        try {
            // const pools: Pool[] = await DB.getActivePools(req.body.userName, req.body.tokenName);
            const token: Token = new Token(
                req.body.tokenName,
                req.body.tokenHashrateGlobalGhPerSec,
                req.body.tokenBlockPerHourAvg
            );

            const poolsObj: { pools: IPool[] } = JSON.parse(req.body.pools);

            const pools: Pool[] = poolsObj.pools.map(poolObj => {
                return new Pool(
                    poolObj.name,
                    req.body.tokenName,
                    poolObj.timeFromLastBlockMin,
                    poolObj.hashrateGhPerSec
                )
            });

            const bestPool: Pool = await TokenService.chooseBestPool(pools, token);

            res.status(200).json(bestPool);
        } catch (error) {
            res.status(500).json({
                error: error.message,
                errorStack: error.stack
            });
        }
    }
}

export default new TokenController();
