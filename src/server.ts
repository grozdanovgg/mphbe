import { Firestore } from '@google-cloud/firestore';
import * as express from 'express';
import Routes from './router/routes';
import Middleware from './config/middleware';
import Connection from './config/connection';

export default class Server {

    // set app to be of type express.Application
    public app: express.Application;

    constructor() {
        this.app = express();

        Middleware.init(this);
        Connection.init();
        Routes.init(this);
    }
}

// export
// export default new Server().app;
