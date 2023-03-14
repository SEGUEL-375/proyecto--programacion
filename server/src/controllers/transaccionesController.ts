import { database } from '../database';
import { json, Request, Response } from 'express';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

class TransaccionesController {

    getTransacciones = async (req: Request, res: Response) => {
        try {

            const connection = await database.getConnection();

            const result = await connection.query("SELECT* FROM transacciones");

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

    getTransaccion = async(req: Request, res: Response) => {
        const id = req.params.id
        console.log(id);
        try {
            const connection = await database.getConnection();
            const idTransaccion = await connection.query("SELECT id_transaccion FROM transacciones WHERE id_transaccion = ?", id);

            if (idTransaccion.length < 1) {
                return res.status(404).json({
                    ok: false,
                    message: 'La transaccion no existe'
                });
            }

            const result = await connection.query("SELECT* FROM transacciones WHERE id_transaccion = ?", id);
            res.status(200).json({
                ok: true,
                result,
                msg: 'Transaccion Encontrada'

            })

        } catch (error: any) {
            res.status(500).json({
                ok: false,
                msg: error.message
            })
        }

    }
    
    addTransacciones = async (req: Request, res: Response) => {
        const { id_transaccion,origen, destino, cantidad,fecha_realizada} = req.body

        const transaccion = {
            id_transaccion,
            origen,
            destino,
            cantidad,
            fecha_realizada
        }
        try {
            const connection = await database.getConnection();

            const result = await connection.query("INSERT INTO transacciones SET ?", transaccion);

            res.status(200).json({
                ok: true,
                result,
                message: 'Transaccion agregada con exito!!'
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: error
            })
        }
    }

    editTransacciones = async (req: Request, res: Response) => {
        const id = req.params.id
        console.log(id);
        try {

            const transaccionActualizado = req.body

            const connection = await database.getConnection();

            const idTransaccion = await connection.query("SELECT id_transaccion FROM transacciones WHERE id_transaccion =? ", id);

            if (idTransaccion.length < 1) {
                return res.status(404).json({
                    ok: false,
                    message: 'La Transaccion no existe'
                });
            }

            const result = await connection.query("UPDATE transacciones set ? WHERE id_transaccion= ?", [transaccionActualizado, id]);

            res.status(200).json({
                ok: true,
                result,
                msg: 'Transaccion Actualizado'

            })

        } catch (error: any) {
            res.status(500).json({
                ok: false,
                msg: error.message
            })
        }

    }

    deleteTransacciones = async (req: Request, res: Response) => {


        const id = req.params.id
        console.log(id);
        try {

            const transaccionEliminado = req.body

            const connection = await database.getConnection();

            const idTransaccion = await connection.query("SELECT id_transaccion FROM transacciones WHERE id_transaccion = ?", id);

            if (idTransaccion.length < 1) {
                return res.status(404).json({
                    ok: false,
                    message: 'La transaccion no existe'
                });
            }

            const result = await connection.query("DELETE transacciones set ? WHERE id_transaccion= ? ", [transaccionEliminado, id]);

            res.status(200).json({
                ok: true,
                result,
                msg: 'Transaccion eliminada'

            })

        } catch (error: any) {
            res.status(500).json({
                ok: false,
                msg: error.message
            })
        }


    }


   }












export const transaccionesController = new TransaccionesController()