"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transaccionesController = void 0;
const database_1 = require("../database");
/**
 *
 * @param {*} req
 * @param {*} res
 */
class TransaccionesController {
    constructor() {
        this.getTransacciones = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.database.getConnection();
                const result = yield connection.query("SELECT* FROM transacciones");
                res.status(200).json({
                    ok: true,
                    result
                });
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    msg: error.message
                });
            }
        });
        this.getTransaccion = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            console.log(id);
            try {
                const connection = yield database_1.database.getConnection();
                const idTransaccion = yield connection.query("SELECT id_transaccion FROM transacciones WHERE id_transaccion = ?", id);
                if (idTransaccion.length < 1) {
                    return res.status(404).json({
                        ok: false,
                        message: 'La transaccion no existe'
                    });
                }
                const result = yield connection.query("SELECT* FROM transacciones WHERE id_transaccion = ?", id);
                res.status(200).json({
                    ok: true,
                    result,
                    msg: 'Transaccion Encontrada'
                });
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    msg: error.message
                });
            }
        });
        this.addTransacciones = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id_transaccion, origen, destino, cantidad, fecha_realizada } = req.body;
            const transaccion = {
                id_transaccion,
                origen,
                destino,
                cantidad,
                fecha_realizada
            };
            try {
                const connection = yield database_1.database.getConnection();
                const result = yield connection.query("INSERT INTO transacciones SET ?", transaccion);
                res.status(200).json({
                    ok: true,
                    result,
                    message: 'Transaccion agregada con exito!!'
                });
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    message: error
                });
            }
        });
        this.editTransacciones = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            console.log(id);
            try {
                const transaccionActualizado = req.body;
                const connection = yield database_1.database.getConnection();
                const idTransaccion = yield connection.query("SELECT id_transaccion FROM transacciones WHERE id_transaccion =? ", id);
                if (idTransaccion.length < 1) {
                    return res.status(404).json({
                        ok: false,
                        message: 'La Transaccion no existe'
                    });
                }
                const result = yield connection.query("UPDATE transacciones set ? WHERE id_transaccion= ?", [transaccionActualizado, id]);
                res.status(200).json({
                    ok: true,
                    result,
                    msg: 'Transaccion Actualizado'
                });
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    msg: error.message
                });
            }
        });
        this.deleteTransacciones = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            console.log(id);
            try {
                const transaccionEliminado = req.body;
                const connection = yield database_1.database.getConnection();
                const idTransaccion = yield connection.query("SELECT id_transaccion FROM transacciones WHERE id_transaccion = ?", id);
                if (idTransaccion.length < 1) {
                    return res.status(404).json({
                        ok: false,
                        message: 'La transaccion no existe'
                    });
                }
                const result = yield connection.query("DELETE transacciones set ? WHERE id_transaccion= ? ", [transaccionEliminado, id]);
                res.status(200).json({
                    ok: true,
                    result,
                    msg: 'Transaccion eliminada'
                });
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    msg: error.message
                });
            }
        });
    }
}
exports.transaccionesController = new TransaccionesController();
