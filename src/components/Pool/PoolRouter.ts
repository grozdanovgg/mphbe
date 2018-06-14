import { Router } from 'express';
import PoolController from './PoolController';


export default class PoolRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        // this.router.get('/', PoolController.getBestPool);
        this.router.get('/best', PoolController.getBestPool);
        // this.router.get('/', HopService.getTokenGlobalHashrate);
        this.router.post('/', PoolController.createPool);
        this.router.post('/start', PoolController.startWatchingPool);
        this.router.put('/', PoolController.updatePool);
        this.router.delete('/', PoolController.deletePool);
    }
}
