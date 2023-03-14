import { database } from '../database';
import { Request, Response } from 'express';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

class UsuariosController {

    getUsuarios = async (req: Request, res: Response) => {
        try {
            const connection = await database.getConnection();
            const result = await connection.query("SELECT id, username,email, password,date_joined FROM usuarios");
            res.status(200).json({
                ok: true,
                result
            })
        } catch (error: any) {
            res.status(500).json({
                ok: false,
                msg: error.message
            })
        }
    }

    getUsuario = async (req: Request, res: Response) => {
        const id = req.params.id
        console.log(id);
        try {
            const connection = await database.getConnection();
            const idUsuario = await connection.query("SELECT id FROM usuarios WHERE id = ?", id);

            if (idUsuario.length < 1) {
                return res.status(404).json({
                    ok: false,
                    message: 'El Usuario no existe'
                });
            }

            const result = await connection.query("SELECT* FROM usuarios WHERE id = ?", id);
            res.status(200).json({
                ok: true,
                result,
                msg: 'Usuario Encontrado'

            })

        } catch (error: any) {
            res.status(500).json({
                ok: false,
                msg: error.message
            })
        }

    }



    addUsuarios = async (req: Request, res: Response) => {
        const { id,username, email, password,date_joined } = req.body
        const usuario = {
            id,
            username,
            email, password,
            date_joined,
        }
        try {
            const connection = await database.getConnection();
            const result = await connection.query("INSERT INTO usuarios SET ?", usuario);

            res.status(200).json({
                ok: true,
                result,
                message: 'Usuario agregado con exito!!'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: error
            })
        }
    }
    editUsuario = async (req: Request, res: Response) => {
        const id = req.params.id
        console.log(id);
        try {
            const usuarioActualizado = req.body
            const connection = await database.getConnection();
            const idUsuario = await connection.query("SELECT id FROM usuarios WHERE id = ?", id);
            if (idUsuario.length < 1) {
                return res.status(404).json({
                    ok: false,
                    message: 'El Usuario no existe'
                });
            }
            const result = await connection.query("UPDATE usuarios set ? WHERE id = ?", [usuarioActualizado, id]);
            res.status(200).json({
                ok: true,
                result,
                msg: 'Usuario Actualizado'
            })
        } catch (error: any) {
            res.status(500).json({
                ok: false,
                msg: error.message
            })
        }
    }

    deleteUsuario = async (req: Request, res: Response) => {
        const id = req.params.id
        console.log(id);
        try {
            const usuarioEliminado = req.body
            const connection = await database.getConnection();
            const idUsuario = await connection.query("SELECT id FROM usuarios WHERE id = ?", id);
            if (idUsuario.length < 1) {
                return res.status(404).json({
                    ok: false,
                    message: 'El usuario no existe'
                });
            }
            const result = await connection.query("DELETE usuarios set ? WHERE id=?", [usuarioEliminado, id]);
            res.status(200).json({
                ok: true,
                result,
                msg: 'Transaccion Actualizada'
            })
        } catch (error: any) {
            res.status(500).json({
                ok: false,
                msg: error.message
            })
        }
    }


}

export const usuariosController = new UsuariosController()