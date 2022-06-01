const db = require('../db')

const insert = async (body) => {
    try {
        const con = await db.getConnection()
        //insert employee
        var sql = `INSERT INTO m_employee (code, full_name, account, organization_id) VALUES 
        ('${body.code}', '${body.full_name}','${body.account}',${body.organization_id})`;
        const result = await con.query(sql)
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't insert into m_employee");
        return null;
    }
}

const update = async (id, body) => {
    try {
        const con = await db.getConnection()
        //update customer
        var sql = `Update m_employee Set code = '${body.code}', full_name = '${body.full_name}', account = '${body.account}', 
        organization_id = ${body.organization_id} 
        where id = ${id}`;
        const result = await con.query(sql)
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_employee");
        return null;
    }
}

module.exports = {
    insert,
    update
};