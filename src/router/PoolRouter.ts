import { Router } from 'express';
import PoolController from '../controllers/PoolController';

export default class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get('/', PoolController.getAllPools);
        this.router.post('/', PoolController.createPool);
        this.router.put('/', PoolController.updatePool);
        this.router.delete('/', PoolController.deletePool);
    }
}
