import mysql from 'promise-mysql';
import config from "./config";





const connection = mysql.createConnection({
    host: 'localhost',//config.host,
    database:'banco',//config.database,
    user:'root',//config.user,
    password:'', //config.password
})
class Database{
    getConnection = ()=>{ 
    console.log("se conecto")
    return connection
}}

export const database = new Database()