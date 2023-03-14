import express, { Router } from 'express';

import{ usuariosController} from '../controllers/usuariosController'
class UsuariosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', usuariosController.getUsuarios );
        this.router.get('/:id',usuariosController.getUsuario );
        this.router.post('/',usuariosController.addUsuarios );
        this.router.put('/:id', usuariosController.editUsuario);
        this.router.delete('/:id',usuariosController.deleteUsuario);
    }

}

export default new UsuariosRoutes().router;