const sql = require('mssql');

const config = {
    user: 'YOUR_SQL_USER',
    password: 'YOUR_PASSWORD',
    server: 'YOUR_SERVER_NAME', // e.g. localhost or YOUR_PC\SQLEXPRESS
    database: 'YOUR_DATABASE_NAME',
    options: {
    encrypt: false, // Use true for Azure
    trustServerCertificate: true
    }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.conect();

module.exports = { sql, pool, poolConnect };