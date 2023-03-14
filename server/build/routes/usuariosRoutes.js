"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', usuariosController_1.usuariosController.getUsuarios);
        this.router.get('/:id', usuariosController_1.usuariosController.getUsuario);
        this.router.post('/', usuariosController_1.usuariosController.addUsuarios);
        this.router.put('/:id', usuariosController_1.usuariosController.editUsuario);
        this.router.delete('/:id', usuariosController_1.usuariosController.deleteUsuario);
    }
}
exports.default = new UsuariosRoutes().router;
