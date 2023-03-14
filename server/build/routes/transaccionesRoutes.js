"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaccionesController_1 = require("../controllers/transaccionesController");
class TransaccionesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', transaccionesController_1.transaccionesController.getTransacciones);
        this.router.get('/:id', transaccionesController_1.transaccionesController.getTransaccion);
        this.router.post('/', transaccionesController_1.transaccionesController.addTransacciones);
        this.router.put('/:id', transaccionesController_1.transaccionesController.editTransacciones);
        this.router.delete('/:', transaccionesController_1.transaccionesController.deleteTransacciones);
    }
}
exports.default = new TransaccionesRoutes().router;
