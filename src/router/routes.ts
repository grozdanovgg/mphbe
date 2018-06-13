import * as express from 'express';
// import UserRouter from './UserRouter';
import PoolRouter from './PoolRouter';
import IServer from '../interfaces/ServerInterface';

export default class Routes {
    static init(server: IServer): void {
        const router: express.Router = express.Router();

        server.app.use('/', router);

        // users
        // server.app.use('/v1/users', new UserRouter().router);
        server.app.use('/v1/pools', new PoolRouter().router);
    }
}
