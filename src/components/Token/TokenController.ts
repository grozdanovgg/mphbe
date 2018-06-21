// // import UserModel from '../models/UserModel';
// import * as express from 'express';
// import IPool from '../Pool/IPool';
// import DB from '../../database/repository';

// class TokenController {
//     // public getUser(req: express.Request, res: express.Response, next: express.NextFunction): void {

//     // }

//     // public createUser(req: express.Request, res: express.Response, next: express.NextFunction): void {

//     // }

//     addPool(req: express.Request, res: express.Response, next: express.NextFunction): void {
//         const pool: IPool = {
//             name: req.body.name,
//             blocksUrl: req.body.blocksUrl,
//             tokenUrl: req.body.tokenUrl,
//             blockHtmlSelector: req.body.blockHtmlSelector,
//             hashrateHtmlSelector: req.body.hashrateHtmlSelector,
//             isPoolBase: false,
//             tokenGlobalHashrateGhPerSec: req.body.tokenGlobalHashrateGhPerSec,
//             tokenBlocksPerHour: req.body.tokenBlocksPerHour,
//         }

//         DB.setDocInSubcollection('tokens', 'rvnToken', 'pools', req.body.name, pool)
//             .then((data) => {
//                 res.status(200).json({ data });
//             })
//             .catch((error: Error) => {
//                 res.status(500).json({
//                     error: error.message,
//                     errorStack: error.stack
//                 });
//                 next(error);
//             });
//     }
// }

// export default new TokenController();
