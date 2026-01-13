import mysql from "mysql2/promise";

export const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chau@2008',
    database: 'QLKHO'
});