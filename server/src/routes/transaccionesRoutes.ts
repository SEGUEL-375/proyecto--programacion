import express, { Router } from 'express';

import {transaccionesController} from '../controllers/transaccionesController';

class TransaccionesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/',transaccionesController.getTransacciones);
        this.router.get('/:id',transaccionesController.getTransaccion);
        this.router.post('/',transaccionesController.addTransacciones );
        this.router.put('/:id',transaccionesController.editTransacciones );
        this.router.delete('/:',transaccionesController.deleteTransacciones);
    }

}

export default new TransaccionesRoutes().router;