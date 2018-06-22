import { Router } from 'express';
import PoolController from './PoolController';


export default class PoolRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.post('/add', PoolController.addPool);
        // this.router.get('/', PoolController.getBestPool);
        // this.router.get('/best', PoolController.getBestPool);
        // this.router.get('/', HopService.getTokenGlobalHashrate);
        // this.router.post('/testSubCol', PoolController.addPoolToToken);
        // this.router.post('/start', PoolController.startWatchingPool);
        // this.router.put('/', PoolController.updatePool);
        // this.router.delete('/', PoolController.deletePool);
    }
}
