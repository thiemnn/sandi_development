const db = require('../db')

const get = async (_id) => {
    try {
        const con = await db.getConnection()
        const providers = await con.query(`SELECT * FROM m_general_cate WHERE id = ` + _id)
        await con.end()    
        if(providers && providers.length > 0)
            return {"provider": providers[0]}
        else 
            return null
    } catch (e) {
        console.log("can't query m_general_cate by id");
        return null;  
    } 
}

const getAll = async () =>{
    try {
        const con = await db.getConnection()
        const providers = await con.query("SELECT * FROM m_general_cate WHERE 1 = 1")
        await con.end()    
        return providers
    } catch (e) {
        console.log("can't query all m_general_cate");
        return null;  
    }  
}

const insert = async (body) =>{
    try {
        const con = await db.getConnection()
        var sql = `INSERT INTO m_general_cate (cate_key, cate_name, cate_type) VALUES 
        ('${body.cate_key}', '${body.cate_name}','${body.cate_type}')`;  
        const result = await con.query(sql)
        await con.end()    
        return result
    } catch (e) {
        console.log("can't insert into m_general_cate");
        return null;  
    }  
}

module.exports = {
    get,
    insert,
    getAll
};