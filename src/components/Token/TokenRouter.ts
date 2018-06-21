import { Router } from 'express';
import Token from './Token';
import Tokens from './TokensEnum';


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
        this.router.post('/add', new Token(Tokens.RVN).startHopWorker);
        // this.router.post('/testSubCol', PoolController.addPoolToToken);
        // this.router.post('/start', PoolController.startWatchingPool);
        // this.router.put('/', PoolController.updatePool);
        // this.router.delete('/', PoolController.deletePool);
    }
}
