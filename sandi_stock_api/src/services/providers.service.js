const db = require('../db')

const get = async (_id) => {
    try {
        const con = await db.getConnection()
        const providers = await con.query(`SELECT * FROM m_provider WHERE id = ` + _id)
        await con.end()    
        if(providers && providers.length > 0)
            return {"provider": providers[0]}
        else 
            return null
    } catch (e) {
        console.log("can't query providers by id");
        return null;  
    } 
}

const getAll = async () =>{
    try {
        const con = await db.getConnection()
        const providers = await con.query("SELECT * FROM m_provider WHERE status = 1")
        await con.end()    
        return providers
    } catch (e) {
        console.log("can't query all providers");
        return null;  
    }  
}

const insert = async (body) =>{
    try {
        const con = await db.getConnection()
        var sql = `INSERT INTO m_provider (code, name, address, email, tax_code, phone, remark) VALUES 
        ('${body.code}', '${body.name}','${body.address}','${body.email}','${body.tax_code}','${body.phone}','${body.remark}')`;  
        const result = await con.query(sql)
        await con.end()    
        return result
    } catch (e) {
        console.log("can't insert into m_provider");
        return null;  
    }  
}

module.exports = {
    get,
    insert,
    getAll
};