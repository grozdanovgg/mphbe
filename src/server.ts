
import * as express from 'express';
import Routes from './routes';
import Middleware from './middlewares/middleware';

export default class Server {

    // set app to be of type express.Application
    public app: express.Application;

    constructor() {
        this.app = express();
        Middleware.init(this);
        Routes.init(this);
    }
}
