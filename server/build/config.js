"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = {
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
};
