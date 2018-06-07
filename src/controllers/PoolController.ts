
import PoolModel from '../models/PoolModel';
import * as express from 'express';
import PoolService from '../services/PoolService';
import { debug } from 'util';

class PoolController {
    public checkPool(req: express.Request, res: express.Response, next: express.NextFunction): void {

        PoolModel
            .findOne({
                name: req.query.name
            })
            .then((data) => {

                // const url: string = 'https://www.omegapool.cc/index.php?coin=raven&page=blocks';

                // PoolService.getHopStatus(data['url'], data['lastBlockHtmlSelector'])
                //     .then((data) => {
                //         console.log(data);
                //         res.status(200).json({ data });

                //     }).catch((err) => {
                //         console.log(err);
                //     });

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
    public createPool(req: express.Request, res: express.Response, next: express.NextFunction): void {
        PoolModel
            .create({
                name: req.body.name,
                url: req.body.url,
                lastBlockHtmlSelector: req.body.lastBlockHtmlSelector
            })
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

        PoolModel
            .findOneAndUpdate(
                { name: req.body.name },
                {
                    $set: {
                        name: req.body.name,
                        url: req.body.url,
                        lastBlockHtmlSelector: req.body.lastBlockHtmlSelector
                    }
                })
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

    public deletePool(req: express.Request, res: express.Response, next: express.NextFunction): void {

        PoolModel
            .remove(
                { name: { $eq: req.body.name } }
            )
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

}

export default new PoolController();
