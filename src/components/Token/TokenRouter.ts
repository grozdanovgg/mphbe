import { Router } from 'express';
import TokenController from './TokenController';


export default class TokenRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.post('/add', TokenController.addToken);
        this.router.post('/info', TokenController.getTokenInfo);
        this.router.get('/best-pool', TokenController.getBestPool);
        // this.router.get('/', PoolController.getBestPool);
        // this.router.get('/best', PoolController.getBestPool);
        // this.router.get('/', HopService.getTokenGlobalHashrate);
        // this.router.post('/testSubCol', PoolController.addPoolToToken);
        // this.router.post('/start', PoolController.startWatchingPool);
        // this.router.put('/', PoolController.updatePool);
        // this.router.delete('/', PoolController.deletePool);
    }
}
