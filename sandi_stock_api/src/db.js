'use strict';
const mysql = require('promise-mysql');

const getConnection = async () => {
    return await mysql.createConnection({
        host: "115.146.123.101",
        user: "test",
        password: "chibin911",
        database: "sandi_stock_db"
    })
}

module.exports = {
    getConnection
};