
import PoolModel from '../models/PoolModel';
import * as express from 'express';

class PoolController {
    public checkPool(req: express.Request, res: express.Response, next: express.NextFunction): void {
        PoolModel
            .findOne({
                name: req.query.name,
                url: req.query.url
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

}

export default new PoolController();
