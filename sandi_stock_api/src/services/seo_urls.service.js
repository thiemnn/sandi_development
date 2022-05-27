const mysql = require('mysql')
const db = require('../db')

const get = async (_id) =>{
    try {
        const con = await db.getConnection()
        const query = "select A.url_seo, A.url_type, A.relation_id, "+
        "coalesce(B.meta_title, C.meta_title, D.meta_title, E.meta_title) as meta_title, "+
        "coalesce(B.meta_desc, C.meta_desc, D.meta_desc, E.meta_desc) as meta_desc, "+
        "coalesce(B.image, C.image, D.image, E.image) as image "+
        "from url_seo_list as A " +
        "left join categories as B on A.relation_id = B.id and A.url_type = 1 " +
        "left join products as C on A.relation_id = C.id and A.url_type = 2 " +
        "left join news_categories as D on A.relation_id = D.id and A.url_type = 3 " +
        "left join news as E on A.relation_id = E.id and A.url_type = 4 " +
        "where A.url_seo = '" + _id + "'";
        const seo_url = await con.query(query)
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