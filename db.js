const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'ForTheLoveOfTheGame',
    server: '127.0.0.1', // e.g. localhost or YOUR_PC\SQLEXPRESS
    port: 1433,
    database: 'UserAuthdb',
    options: {
    encrypt: false, // Use true for Azure
    trustServerCertificate: true
    }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

module.exports = { sql, pool, poolConnect };