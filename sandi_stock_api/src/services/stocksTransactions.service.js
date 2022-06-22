const db = require('../db')

const insert = async (body) => {
    try {
        const con = await db.getConnection()
        //insert m_stock
        var sql = `INSERT INTO m_stock_transaction (transaction_number, stock_id, deliver_person, deliver_unit, deliver_address, explain, attach) VALUES 
        ('${body.transaction_number}', ${body.stock_id},'${body.deliver_person}','${body.deliver_unit}','${body.deliver_address}','${body.explain}','${body.attach}')`;
        const result = await con.query(sql)
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't insert into m_stock_transaction");
        return null;
    }
}

const update = async (id, body) => {
    try {
        const con = await db.getConnection()
        //update m_stock
        var sql = `Update m_stock_transaction Set transaction_number = '${body.transaction_number}', stock_id = ${body.stock_id}, deliver_person = '${body.deliver_person}', 
        deliver_unit = '${body.deliver_unit}',deliver_address = '${body.deliver_address}',explain = '${body.explain}',attach = '${body.attach}'
        where id = ${id}`;
        const result = await con.query(sql)
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_stock_transaction");
        return null;
    }
}

module.exports = {
    insert,
    update
};