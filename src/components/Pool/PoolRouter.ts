import { Router } from 'express';
import PoolController from './PoolController';
import * as HopService from '../Token/HopService';
import Pool from './PoolModel';

export default class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get('/', PoolController.getBestPool);
        // this.router.get('/', HopService.getTokenGlobalHashrate);
        this.router.post('/', PoolController.createPool);
        this.router.put('/', PoolController.updatePool);
        this.router.delete('/', PoolController.deletePool);
    }
}
