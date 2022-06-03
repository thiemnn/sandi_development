const db = require('../db')

const insert = async (body) => {
    try {
        const con = await db.getConnection()
        //insert m_product
        var sql = `INSERT INTO m_product (code, name, description, group_id) VALUES 
        ('${body.code}', '${body.name}','${body.description}',${body.group_id})`;
        const result = await con.query(sql)
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't insert into m_product");
        return null;
    }
}

const update = async (id, body) => {
    try {
        const con = await db.getConnection()
        //update m_product
        var sql = `Update m_product Set code = '${body.code}', name = '${body.name}', description = '${body.description}', 
        group_id = ${body.group_id} 
        where id = ${id}`;
        const result = await con.query(sql)
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_product");
        return null;
    }
}

const delete_item = async (id) =>{
    try {
        const con = await db.getConnection()
        //update m_product
        var sql = `Update m_product Set status = 0 where id = ${id}`;
        const result = await con.query(sql)        
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_product");
        return null;  
    }  
}

module.exports = {
    insert,
    update,
    delete_item
};