import * as express from 'express';
import DB from '../../database/repository';
import Pool from './Pool';
import IPool from './IPool';


class PoolController {

    addPool(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const pool: IPool = {
            name: req.body.name,
            blocksUrl: req.body.blocksUrl,
            tokenUrl: req.body.tokenUrl,
            blockHtmlSelector: req.body.blockHtmlSelector,
            hashrateHtmlSelector: req.body.hashrateHtmlSelector,
            isPoolBase: false,
            tokenGlobalHashrateGhPerSec: req.body.tokenGlobalHashrateGhPerSec,
            tokenBlocksPerHour: req.body.tokenBlocksPerHour,
        }

        DB.setDocInSubcolofSubcol(
            'users', req.body.userName,
            'tokens', req.body.tokenName,
            'pools', req.body.poolName,
            pool
        ).then((data) => {
            res.status(200).json({ data });
        }).catch((error: Error) => {
            res.status(500).json({
                error: error.message,
                errorStack: error.stack
            });
            next(error);
        });
    }

    public startWatchingPool = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction): Promise<void> => {

        let pool: Pool;
        let result: IPool;

        try {
            result = await DB.getDocInCol('pools', req.body.name);
            pool = new Pool(
                result.name,
                result.blocksUrl, result.tokenUrl,
                result.blockHtmlSelector,
                result.hashrateHtmlSelector,
                result.isPoolBase,
            );


            await DB.setDocInCol('activePools', pool.name, pool)

            // this.activePools.push(pool)
            res.status(200).json(pool);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

    public getBestPool = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction): Promise<void> => {

        let activePools: Pool[];
        let collection: Document[];
        try {

            collection = await DB.getAllUsers('activePools')
            for (let document of collection) {

            }

        } catch (error) {
            console.log(error);
        }

        // this.activePools.forEach((pool: Pool) => {
        //     console.log(pool);
        // })

        // res.status(200).json(this.activePools);
        // DB.getDocInCollection('pools', req.query.name)
        //     .then((pool: Pool) => {
        //         console.log(pool);
        //         pool.crawlPoolBlocks();
        //         res.status(200).json({ pool });

        //     }).catch((err) => {
        //         console.log(err);
        //     });


        // subscribe to event when found new best pool?
        // return this.bestPool;

        // for (let pool of this.activePools) {

        //     await pool.getHopStatus(pool.name, pool.lastBlockHtmlSelector);
        // }

        // // TODO: to return the best pool
        // return this.activePools[0];
    }

}

export default new PoolController();
