const db = require('../db')

const insert = async (body) => {
    try {
        const con = await db.getConnection()
        //insert m_stock
        var sql = `INSERT INTO m_stock (code, name, description, group_id, status) VALUES 
        ('${body.code}', '${body.name}','${body.description}',${body.group_id},${body.status})`;
        const result = await con.query(sql)
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't insert into m_stock");
        return null;
    }
}

const update = async (id, body) => {
    try {
        const con = await db.getConnection()
        //update m_stock
        var sql = `Update m_stock Set code = '${body.code}', name = '${body.name}', description = '${body.description}', 
        group_id = ${body.group_id}
        where id = ${id}`;
        const result = await con.query(sql)
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_stock");
        return null;
    }
}

const delete_item = async (id) =>{
    try {
        const con = await db.getConnection()
        //update m_stock
        var sql = `Update m_stock Set status = -1 where id = ${id}`;
        const result = await con.query(sql)        
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_stock");
        return null;  
    }  
}

module.exports = {
    insert,
    update,
    delete_item
};