import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import transaccionesRoutes from './routes/transaccionesRoutes';
import usuariosRoutes from './routes/usuariosRoutes';


class Server {

    public app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3009);

        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());//para poder aceptar formatos json
        this.app.use(express.urlencoded({extended: false}));//en caso de enviar en formulario hrml
    }

    routes(): void {
        this.app.use('/account', usuariosRoutes);
        this.app.use('/transactions', transaccionesRoutes);
       
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();