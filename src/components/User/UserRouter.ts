import { Router } from 'express';
import UserController from './UserController';


export default class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.post('/', UserController.createUser);
        // this.router.get('/', PoolController.getBestPool);
        // this.router.get('/best', PoolController.getBestPool);
        // this.router.get('/', HopService.getTokenGlobalHashrate);
        // this.router.post('/tokens', UserController.addToken);
        // this.router.post('/testSubCol', PoolController.addPoolToToken);
        // this.router.post('/start', PoolController.startWatchingPool);
        // this.router.put('/', PoolController.updatePool);
        // this.router.delete('/', PoolController.deletePool);
    }
}
