const db = require('../db')

const insert = async (body) => {
    try {
        const con = await db.getConnection()
        //insert m_stock_lines
        var sql = `INSERT INTO m_stock_lines (code, name, description, stock_id) VALUES 
        ('${body.code}', '${body.name}','${body.description}',${body.stock_id})`;
        const result = await con.query(sql)
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't insert into m_stock_lines");
        return null;
    }
}

const update = async (id, body) => {
    try {
        const con = await db.getConnection()
        //update m_stock_lines
        var sql = `Update m_stock_lines Set code = '${body.code}', name = '${body.name}', description = '${body.description}', 
        stock_id = ${body.stock_id}
        where id = ${id}`;
        const result = await con.query(sql)
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_stock_lines");
        return null;
    }
}

const delete_item = async (id) =>{
    try {
        const con = await db.getConnection()
        //update m_stock
        var sql = `Update m_stock_lines Set status = -1 where id = ${id}`;
        const result = await con.query(sql)        
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_stock_lines");
        return null;  
    }  
}

const getAll = async (stock_id) =>{
    try {
        const con = await db.getConnection()
        const stock_lines = await con.query(`SELECT * FROM m_stock_lines where stock_id = ${stock_id} and (status = 0 or status = 1)`)
        const stock_shelfs = await con.query(`SELECT A.* FROM m_stock_shelfs as A
        inner join m_stock_lines as B on A.stock_line_id= B.id
        where B.stock_id = ${stock_id} and (A.status = 0 or A.status = 1)`)        
        await con.end()    
        stock_lines.forEach(stock_line => {
            const shelfs = stock_shelfs.filter(stock_shelf => stock_shelf.stock_line_id === stock_line.id);
            stock_line.shelfs = shelfs;
        });
        return stock_lines
    } catch (e) {
        console.log("can't query all stock_lines");
        return null;  
    }  
}

module.exports = {
    insert,
    update,
    delete_item,
    getAll
};