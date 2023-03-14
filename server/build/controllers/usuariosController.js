"use strict";
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
    return new(P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosController = void 0;
const database_1 = require("../database");
/**
 *
 * @param {*} req
 * @param {*} res
 */
class UsuariosController {
    constructor() {
        this.getUsuarios = (req, res) => __awaiter(this, void 0, void 0, function*() {
            try {
                const connection = yield database_1.database.getConnection();
                const result = yield connection.query("SELECT id,username,email, password,date_joined FROM usuarios");
                res.status(200).json({
                    ok: true,
                    result
                });
            } catch (error) {
                res.status(500).json({
                    ok: false,
                    msg: error.message
                });
            }
        });
        this.getUsuario = (req, res) => __awaiter(this, void 0, void 0, function*() {
            const id = req.params.id;
            console.log(id);
            try {
                const connection = yield database_1.database.getConnection();
                const idUsuario = yield connection.query("SELECT id FROM usuarios WHERE id = ?", id);
                if (idUsuario.length < 1) {
                    return res.status(404).json({
                        ok: false,
                        message: 'El Usuario no existe'
                    });
                }
                const result = yield connection.query("SELECT* FROM usuarios WHERE id = ?", id);
                res.status(200).json({
                    ok: true,
                    result,
                    msg: 'Usuario Encontrado'
                });
            } catch (error) {
                res.status(500).json({
                    ok: false,
                    msg: error.message
                });
            }
        });
        this.addUsuarios = (req, res) => __awaiter(this, void 0, void 0, function*() {
            const { username, email, password, date_joined } = req.body;
            const usuario = {
                username,
                email,
                password,
                date_joined,
            };
            try {
                const connection = yield database_1.database.getConnection();
                const result = yield connection.query("INSERT INTO usuarios SET ?", usuario);
                res.status(200).json({
                    ok: true,
                    result,
                    message: 'Usuario agregado con exito!!'
                });
            } catch (error) {
                res.status(500).json({
                    ok: false,
                    message: error
                });
            }
        });
        this.editUsuario = (req, res) => __awaiter(this, void 0, void 0, function*() {
            const id = req.params.id;
            console.log(id);
            try {
                const usuarioActualizado = req.body;
                const connection = yield database_1.database.getConnection();
                const idUsuario = yield connection.query("SELECT id FROM usuarios WHERE id = ?", id);
                if (idUsuario.length < 1) {
                    return res.status(404).json({
                        ok: false,
                        message: 'El Usuario no existe'
                    });
                }
                const result = yield connection.query("UPDATE usuarios set ? WHERE id = ?", [usuarioActualizado, id]);
                res.status(200).json({
                    ok: true,
                    result,
                    msg: 'Usuario Actualizado'
                });
            } catch (error) {
                res.status(500).json({
                    ok: false,
                    msg: error.message
                });
            }
        });
        this.deleteUsuario = (req, res) => __awaiter(this, void 0, void 0, function*() {
            const id = req.params.id;
            console.log(id);
            try {
                const usuarioEliminado = req.body;
                const connection = yield database_1.database.getConnection();
                const idUsuario = yield connection.query("SELECT id FROM usuarios WHERE id = ?", id);
                if (idUsuario.length < 1) {
                    return res.status(404).json({
                        ok: false,
                        message: 'El usuario no existe'
                    });
                }
                const result = yield connection.query("DELETE usuarios set ? WHERE id=?", [usuarioEliminado, id]);
                res.status(200).json({
                    ok: true,
                    result,
                    msg: 'Transaccion Actualizada'
                });
            } catch (error) {
                res.status(500).json({
                    ok: false,
                    msg: error.message
                });
            }
        });
    }
}
exports.usuariosController = new UsuariosController();