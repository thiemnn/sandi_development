const db = require('../db')

const get = async (_id) => {
    try {
        const con = await db.getConnection()
        const customers = await con.query(`SELECT A.*, B.cate_name as type_name, C.cate_name as field_name, D.cate_name as region_name FROM m_customer as A
        left join m_general_cate as B on A.type_id = B.cate_key and B.cate_type = 1
        left join m_general_cate as C on A.field_id = C.cate_key and C.cate_type = 2
        left join m_general_cate as D on A.region_id = D.cate_key and D.cate_type = 3 WHERE A.id = ` + _id)
        const contacts = await con.query("SELECT * FROM m_customer_contact where customer_id = " + _id)
        await con.end()    
        if(customers && customers.length > 0)
            return {"customer": customers[0], "contacts": contacts}
        else 
            return null
    } catch (e) {
        console.log("can't query customers by id");
        return null;  
    } 
}

const getAll = async () =>{
    try {
        const con = await db.getConnection()
        const organizations = await con.query("SELECT id, code, name, description, parent_id FROM m_organization where status = 1")
        const employees = await con.query("SELECT id, organization_id, code, full_name, account FROM m_employee WHERE (status = 1 or status = 2)")
        await con.end()
    
        var childs = new Array();
        var ids = new Array();
        organizations.forEach(item => {
            if(!childs[item["parent_id"]]){
                childs[item["parent_id"]] = new Array();  
            }
            childs[item["parent_id"]].push(item["id"].toString());
            ids.push(item["id"].toString())
        });
        organizations.forEach(item => {
            if(childs[item["id"]]){
                item["childs"] = childs[item["id"]];
            }
        });
    
        return {
            "organizations": organizations,
            "employees": employees,
            "ids": ids
        }
    } catch (e) {
        console.log("can't query all organizations");
        return null; 
    }
}

const insert = async (body) =>{
    try {
        const con = await db.getConnection()
        //insert m_organization
        var sql = `INSERT INTO m_organization (code, name, description, parent_id) VALUES 
        ('${body.code}', '${body.name}','${body.description}',${body.parent_id})`;
        const result = await con.query(sql)
        // var id = result.insertId;        
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't insert into m_organization");
        return null;  
    }  
}

const update = async (id, body) =>{
    try {
        const con = await db.getConnection()
        //update customer
        var sql = `Update m_organization Set code = '${body.code}', name = '${body.name}', description = '${body.description}'
         where id = ${id}`;
        const result = await con.query(sql)        
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_organization");
        return null;  
    }  
}

const delete_item = async (id) =>{
    try {
        const con = await db.getConnection()
        //update customer
        var sql = `Update m_organization Set status = 0 where id = ${id}`;
        const result = await con.query(sql)        
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_organization");
        return null;  
    }  
}

const get_employees = async (id) =>{
    try {
        const con = await db.getConnection()
        const employees = await con.query(`SELECT * FROM m_employee WHERE (status = 1 or status = 2) and organization_id = ` + _id)
        await con.end()    
             
        //close connection
        await con.end()
        return {
            "employees": employees,
            "organization_id": id
        }
    } catch (e) {
        console.log("can't delete into m_employee");
        return null;  
    }  
}

module.exports = {
    get,
    insert,
    update,
    delete_item,
    get_employees,
    getAll
};