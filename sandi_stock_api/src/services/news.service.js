const mysql = require('mysql')
const db = require('../db')

const get = async (_id) => {
    try {
        const con = await db.getConnection()
        const news = await con.query(`SELECT A.*, C.name as category_name, C.url_seo as category_url, C.id as category_id FROM news A 
            left JOIN news_category B on A.id = B.news_id
            LEFT JOIN news_categories C on B.category_id = C.id
            WHERE A.id = ` + _id)
        const comments = await con.query("SELECT * FROM news_comments where news_id = " + _id)
        const news_categories = await con.query("SELECT * FROM `news_categories`")
        const otherNews = await con.query(`SELECT A.title, A.url_seo, A.created_time, A.image FROM news A 
            left JOIN news_category B on A.id = B.news_id
            WHERE B.category_id = ` + news[0].category_id + ` order by A.created_time limit 5`)
        await con.end()    
        if(news && news.length > 0)
            return {"news_detail": news[0], "comments": comments, "news_categories": news_categories, "otherNews": otherNews}
        else 
            return null
    } catch (e) {
        console.log("can't query news by id");
        return null;  
    } 
}

const getByCategory = async (_category_id, page, per_page, order_by) =>{
    try {
        const con = await db.getConnection()
        var query = `SELECT A.* FROM 
        (select NS.*, count(NC.id) as comment_count from news_comments NC 
            RIGHT JOIN news NS on NC.news_id = NS.id GROUP by NS.id) A 
        LEFT JOIN news_category B on A.id = B.news_id  
        WHERE A.status = 1 and B.category_id = `
        query = query + _category_id;

        var query_count_news = `Select COUNT(*) as news_count from (`+query+`) A`;
        const news_count = await con.query(query_count_news)

        if(order_by){
            query =  query + ` ORDER by `;
            query =  query + order_by;
        }
        if(per_page && page && page > 0){
            const offset = (page - 1) * per_page;
            query = query + ` limit `;
            query = query + offset;
            query = query + `,`;
            query = query + per_page;
        }
        const news = await con.query(query)
        const news_category = await con.query("SELECT * FROM `news_categories` WHERE id = " + _category_id)
        await con.end()
        return {"news": news, "news_category": news_category[0], "news_count": news_count[0]["news_count"]}
    } catch (e) {
        console.log("can't query news by category");
        return null;  
    }  
}

const getAll = async () =>{
    try {
        const con = await db.getConnection()
        const news = await con.query("SELECT * FROM news where status = 1")
        await con.end()    
        return news
    } catch (e) {
        console.log("can't query all news");
        return null;  
    }  
}

const addComment = async (body) =>{
    try {
        const con = await db.getConnection()
        var sql = `INSERT INTO news_comments (news_id, reply_name, reply_email, reply_website, reply_comment) VALUES 
        (${body.news_id}, '${body.name}','${body.email}','${body.website}','${body.comment}')`;  
        const result = await con.query(sql)
        await con.end()    
        return result
    } catch (e) {
        console.log("can't insert into news_comments");
        return null;  
    }  
}

module.exports = {
    get,
    getByCategory,
    addComment,
    getAll
};