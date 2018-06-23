import { WriteResult } from '@google-cloud/firestore';
import * as express from 'express';
import * as DB from '../../database/DatabaseController';
import Pool from './Pool';


class PoolController {

    async addPool(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        const pool: Pool = new Pool(
            req.body.name,
            req.body.blocksUrl,
            req.body.tokenName,
            req.body.tokenUrl,
            req.body.blockHtmlSelector,
            req.body.hashrateHtmlSelector,
            false,
        )

        try {
            const data: WriteResult = await DB.addPool(req.body.userName, req.body.tokenName, pool);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({
                error: error.message,
                errorStack: error.stack
            });
            next(error);
        }
    }

    public getBestPool = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction): Promise<void> => {

        let activePools: Pool[];
        let collection: Document[];
        try {

            // collection = await DB2.getAllUsers('activePools')
            // for (let document of collection) {

            // }

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
