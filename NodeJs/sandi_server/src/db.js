'use strict';
const mysql = require('promise-mysql');

const getConnection = async () => {
    return await mysql.createConnection({
        host: "45.125.237.89",
        user: "test",
        password: "chibin911",
        database: "sandi_website_db"
    })
}

module.exports = {
    getConnection
};