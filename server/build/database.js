"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const connection = promise_mysql_1.default.createConnection({
    host: 'localhost',
    database: 'banco',
    user: 'root',
    password: '', //config.password
});
class Database {
    constructor() {
        this.getConnection = () => {
            console.log("se conecto");
            return connection;
        };
    }
}
exports.database = new Database();
