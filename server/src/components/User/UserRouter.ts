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
        // this.router.put('/', PoolController.updatePool);
        // this.router.delete('/', PoolController.deletePool);
    }
}
