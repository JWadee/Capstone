const mysql = require('mysql');

//DB connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'test',
    password: 'Temp1234',
    database: 'capstone',
    debug: false
});


module.exports = pool;