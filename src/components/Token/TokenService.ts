import DB from '../../database/repository';

export function addPool(req: express.Request, res: express.Response, next: express.NextFunction): void {
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

    DB.setDocInSubcollection('tokens', this.name, 'pools', req.body.name, pool)
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