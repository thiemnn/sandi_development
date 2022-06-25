const db = require('../db')

const insert = async (body) => {
    try {
        const con = await db.getConnection()
        //insert employee
        var sql = `INSERT INTO m_employee (code, full_name, account, organization_id, password) VALUES 
        ('${body.code}', '${body.full_name}','${body.account}',${body.organization_id},'${body.password}')`;
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

const update_password = async (id, body) => {
    try {
        const con = await db.getConnection()
        //update customer
        var sql = `Update m_employee Set password = '${body.password}' where id = ${id}`;
        const result = await con.query(sql)
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_employee");
        return null;
    }
}

const delete_item = async (id) =>{
    try {
        const con = await db.getConnection()
        //update customer
        var sql = `Update m_employee Set status = 0 where id = ${id}`;
        const result = await con.query(sql)        
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_employee");
        return null;  
    }  
}

const getAll = async () =>{
    try {
        const con = await db.getConnection()
        const customers = await con.query(`select *, full_name as name from m_employee`)
        await con.end()    
        return customers
    } catch (e) {
        console.log("can't query all m_employee");
        return null;  
    }  
}

module.exports = {
    insert,
    update,
    update_password,
    delete_item,
    getAll
};