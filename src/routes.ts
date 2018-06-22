import * as express from 'express';
import IServer from './interfaces/ServerInterface';
import TokenRouter from './components/Token/TokenRouter';
import PoolRouter from './components/Pool/PoolRouter';
import UserRouter from './components/User/UserRouter';

export default class Routes {
    static init(server: IServer): void {
        const router: express.Router = express.Router();

        server.app.use('/', router);

        // users
        server.app.use('/v1/users', new UserRouter().router);
        server.app.use('/v1/pools', new PoolRouter().router);
        server.app.use('/v1/tokens', new TokenRouter().router);
    }
}
