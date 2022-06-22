const db = require('../db')

const insert = async (body) => {
    try {
        const con = await db.getConnection()
        //insert m_stock_shelfs
        var sql = `INSERT INTO m_stock_shelfs (code, name, description, stock_line_id) VALUES 
        ('${body.code}', '${body.name}','${body.description}',${body.stock_line_id})`;
        const result = await con.query(sql)
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't insert into m_stock_shelfs");
        return null;
    }
}

const update = async (id, body) => {
    try {
        const con = await db.getConnection()
        //update m_stock_shelfs
        var sql = `Update m_stock_shelfs Set code = '${body.code}', name = '${body.name}', description = '${body.description}', 
        stock_line_id = ${body.stock_line_id}
        where id = ${id}`;
        const result = await con.query(sql)
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_stock_shelfs");
        return null;
    }
}

const delete_item = async (id) =>{
    try {
        const con = await db.getConnection()
        //update m_stock
        var sql = `Update m_stock_shelfs Set status = -1 where id = ${id}`;
        const result = await con.query(sql)        
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_stock_shelfs");
        return null;  
    }  
}

const getAll = async () =>{
    try {
        const con = await db.getConnection()
        const stock_shelfs = await con.query(`SELECT A.* FROM m_stock_shelfs as A
        inner join m_stock_lines as B on A.stock_line_id= B.id
        where (A.status = 0 or A.status = 1)`)        
        await con.end()   
        return stock_shelfs
    } catch (e) {
        console.log("can't query all stock_shelfs");
        return null;  
    }  
}

module.exports = {
    insert,
    update,
    delete_item,
    getAll
};