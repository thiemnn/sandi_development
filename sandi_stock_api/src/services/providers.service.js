const db = require('../db')

const get = async (_id) => {
    try {
        const con = await db.getConnection()
        const providers = await con.query(`SELECT A.*, B.cate_name as type_name, C.cate_name as field_name, D.cate_name as region_name FROM m_provider as A
        left join m_general_cate as B on A.type_id = B.cate_key and B.cate_type = 1
        left join m_general_cate as C on A.field_id = C.cate_key and C.cate_type = 2
        left join m_general_cate as D on A.region_id = D.cate_key and D.cate_type = 3 WHERE A.id = ` + _id)
        const contacts = await con.query("SELECT * FROM m_provider_contact where provider_id = " + _id)
        await con.end()    
        if(providers && providers.length > 0)
            return {"provider": providers[0], "contacts": contacts}
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
        const providers = await con.query(`SELECT A.*, B.cate_name as type_name, C.cate_name as field_name, D.cate_name as region_name FROM m_provider as A
        left join m_general_cate as B on A.type_id = B.cate_key and B.cate_type = 1
        left join m_general_cate as C on A.field_id = C.cate_key and C.cate_type = 2
        left join m_general_cate as D on A.region_id = D.cate_key and D.cate_type = 3 WHERE A.status = 1`)
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
        //insert provider
        var sql = `INSERT INTO m_provider (code, name, address, email, tax_code, phone, remark, type_id, field_id, region_id) VALUES 
        ('${body.code}', '${body.name}','${body.address}','${body.email}','${body.tax_code}','${body.phone}','${body.remark}',${body.type_id},${body.field_id},${body.region_id})`;
        const result = await con.query(sql)
        var id = result.insertId;
        //insert contacts
        var contacts = body.contacts.filter(function (el) {
            return el.full_name !== ''
        });
        if (contacts.length > 0) {
            var sql_contacts = `INSERT INTO m_provider_contact (provider_id, full_name, position, mobile, email) VALUES`;
            contacts.forEach(function (contact) {
                sql_contacts = sql_contacts + `(${id}, '${contact.full_name}','${contact.position}','${contact.mobile}','${contact.email}'),`;
            });
            await con.query(sql_contacts.slice(0, -1))
        }
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't insert into m_provider");
        return null;  
    }  
}

const update = async (id, body) =>{
    try {
        const con = await db.getConnection()
        //update provider
        var sql = `Update m_provider Set code = '${body.code}', name = '${body.name}', address = '${body.address}', 
         email = '${body.email}', tax_code = '${body.tax_code}', 
         phone = '${body.phone}', remark = '${body.remark}', 
         type_id = ${body.type_id}, field_id = ${body.field_id}, region_id = ${body.region_id} 
         where id = ${id}`;
        const result = await con.query(sql)
        //update contacts
        var contacts = body.contacts.filter(function (el) {
            return el.full_name !== ''
        });
        await con.query(`Delete FROM m_provider_contact where provider_id = ${id}`);
        if (contacts.length > 0) {
            var sql_contacts = `INSERT INTO m_provider_contact (provider_id, full_name, position, mobile, email) VALUES`;
            contacts.forEach(function (contact) {
                sql_contacts = sql_contacts + `(${id}, '${contact.full_name}','${contact.position}','${contact.mobile}','${contact.email}'),`;
            });
            await con.query(sql_contacts.slice(0, -1))
        }
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_provider");
        return null;  
    }  
}

module.exports = {
    get,
    insert,
    update,
    getAll
};