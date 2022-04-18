const mysql = require('mysql')
const db = require('../db')

const get = async (_id) =>{
    try {
        const con = await db.getConnection()
        const seo_url = await con.query("SELECT * FROM url_seo_list where url_seo = '" + _id + "'")
        await con.end()
        return seo_url
    }
    catch (e) {
        console.log("can't query url_seo_list with " + _id);
        return null;
    }
}

const getAll = async () =>{
    try {
        const con = await db.getConnection()
        const seo_urls = await con.query("SELECT * FROM url_seo_list")
        await con.end()

        return seo_urls
    } catch (e) {
        console.log("can't query all url_seo_list");
        return null;
    }
}

module.exports = {
    get,
    getAll
};