const db = require('../db')

const insert = async (body) => {
    try {
        const con = await db.getConnection()
        //insert m_product
        var sql = `INSERT INTO m_product (code, name, description, group_id, manufactor, 
            origin, status, type, unit, unit_to_kg, tk_co, tk_no) VALUES 
        ('${body.code}','${body.name}','${body.description}',${body.group_id},'${body.manufactor}',
            '${body.origin}',${body.status},${body.type},'${body.unit}',${body.unit_to_kg},'${body.tk_co}','${body.tk_no}')`;
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
        var sql = `Update m_product 
        Set code = '${body.code}', 
        name = '${body.name}', 
        description = '${body.description}', 
        manufactor = '${body.manufactor}', 
        origin = '${body.origin}', 
        group_id = ${body.group_id}, 
        status = ${body.status}, 
        unit = '${body.unit}', 
        unit_to_kg = ${body.unit_to_kg}, 
        tk_co = '${body.tk_co}', 
        tk_no = '${body.tk_no}'
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
        var sql = `Update m_product Set status = -1 where id = ${id}`;
        const result = await con.query(sql)        
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_product");
        return null;  
    }  
}

const getAll = async (type) =>{
    try {
        const con = await db.getConnection()
        const products = await con.query(`select * from m_product where type = ${type}`)
        await con.end()    
        return products
    } catch (e) {
        console.log("can't query all products");
        return null;  
    }  
}

module.exports = {
    insert,
    update,
    delete_item,
    getAll
};