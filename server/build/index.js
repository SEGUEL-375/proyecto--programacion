"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const transaccionesRoutes_1 = __importDefault(require("./routes/transaccionesRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));

class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3009);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json()); //para poder aceptar formatos json
        this.app.use(express_1.default.urlencoded({ extended: false })); //en caso de enviar en formulario hrml
    }
    routes() {
        this.app.use('/account', usuariosRoutes_1.default);
        this.app.use('/transactions', transaccionesRoutes_1.default);

    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();