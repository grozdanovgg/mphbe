import { Router } from 'express';
import UserController from './UserController';
import Tokens from '../Token/TokensEnum';


export default class PoolRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        // this.router.get('/', PoolController.getBestPool);
        // this.router.get('/best', PoolController.getBestPool);
        // this.router.get('/', HopService.getTokenGlobalHashrate);
        this.router.post('/add', UserController.addToken(new Token(Tokens.RVN)));
        // this.router.post('/testSubCol', PoolController.addPoolToToken);
        // this.router.post('/start', PoolController.startWatchingPool);
        // this.router.put('/', PoolController.updatePool);
        // this.router.delete('/', PoolController.deletePool);
    }
}
