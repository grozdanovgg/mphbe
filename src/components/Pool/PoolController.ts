import * as express from 'express';
import DB from '../../database/repository';
import Pool from './PoolModel';
// import * as PoolServise from "./PoolService";
import * as Hop from '../../components/Token/HopService';
import IPool from './IPool';


class PoolController {

    // public getAllPools(req: express.Request, res: express.Response, next: express.NextFunction): void {

    //     DB.getCollection('pools')
    //         .then((collection) => {

    //             const url: string = 'https://www.omegapool.cc/index.php?coin=raven&page=blocks';

    //             collection.forEach((pool) => {
    //                 const poolData: Object = pool.data;
    //                 const poolService: PoolService = new PoolService();
    //                 poolService.getHopStatus(poolData['url'], poolData['lastBlockHtmlSelector'])
    //                     .then((data) => {
    //                         console.log(data);

    //                     }).catch((err) => {
    //                         console.log(err);
    //                     });
    //             })

    //             res.status(200).json(collection);
    //         })
    //         .catch((error) => {
    //             console.log('Error getting documents', error);
    //             res.status(500).json({
    //                 error: error.message,
    //                 errorStack: error.stack
    //             });
    //             next(error);
    //         });

    //     // PoolModel
    //     //     .findOne({
    //     //         name: req.query.name
    //     //     })
    //     //     .then((data) => {

    //     //         const url: string = 'https://www.omegapool.cc/index.php?coin=raven&page=blocks';

    //     //         PoolService.getHopStatus(data['url'], data['lastBlockHtmlSelector'])
    //     //             .then((data) => {
    //     //                 console.log(data);
    //     //                 res.status(200).json({ data });

    //     //             }).catch((err) => {
    //     //                 console.log(err);
    //     //             });

    //     //         // res.status(200).json({ data });
    //     //     })
    //     //     .catch((error: Error) => {
    //     //         res.status(500).json({
    //     //             error: error.message,
    //     //             errorStack: error.stack
    //     //         });
    //     //         next(error);
    //     //     });
    // }

    public activePools: Pool[];
    public bestPool: Pool;

    public createPool(req: express.Request, res: express.Response, next: express.NextFunction): void {

        const pool: IPool = {
            name: req.body.name,
            blocksUrl: req.body.blocksUrl,
            tokenUrl: req.body.tokenUrl,
            blockHtmlSelector: req.body.blockHtmlSelector,
            hashrateHtmlSelector: req.body.hashrateHtmlSelector,
            isPoolBase: false
        }

        DB.setDocInCollection('pools', req.body.name, pool)
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error: Error) => {
                res.status(500).json({
                    error: error.message,
                    errorStack: error.stack
                });
                next(error);
            });
    }

    public updatePool(req: express.Request, res: express.Response, next: express.NextFunction): void {

    }

    public deletePool(req: express.Request, res: express.Response, next: express.NextFunction): void {

    }

    public async startWatchingPool(poolId: string): Promise<void> {
        const pool: Pool = await DB.getDocInCollection('pools', poolId);


        this.activePools.push(pool);
        // this.getBestPool();
    }

    public getBestPool(req: express.Request, res: express.Response, next: express.NextFunction): void {

        DB.getDocInCollection('pools', req.query.name)
            .then((pool: Pool) => {
                console.log(pool);
                pool.crawlPoolBlocks();
                res.status(200).json({ pool });

            }).catch((err) => {
                console.log(err);
            });


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
