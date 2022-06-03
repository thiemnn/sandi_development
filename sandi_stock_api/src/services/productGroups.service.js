const db = require('../db')

const getAll = async () =>{
    try {
        const con = await db.getConnection()
        const product_groups = await con.query("SELECT id, code, name, description, parent_id FROM m_product_group where status = 1")
        const products = await con.query("SELECT id, group_id, code, name, description FROM m_product WHERE (status = 1 or status = 2)")
        await con.end()
    
        var childs = new Array();
        var ids = new Array();
        product_groups.forEach(item => {
            if(!childs[item["parent_id"]]){
                childs[item["parent_id"]] = new Array();  
            }
            childs[item["parent_id"]].push(item["id"].toString());
            ids.push(item["id"].toString())
        });
        product_groups.forEach(item => {
            if(childs[item["id"]]){
                item["childs"] = childs[item["id"]];
            }
        });
    
        return {
            "product_groups": product_groups,
            "products": products,
            "ids": ids
        }
    } catch (e) {
        console.log("can't query all product_groups");
        return null; 
    }
}

const insert = async (body) =>{
    try {
        const con = await db.getConnection()
        //insert m_organization
        var sql = `INSERT INTO m_product_group (code, name, description, parent_id) VALUES 
        ('${body.code}', '${body.name}','${body.description}',${body.parent_id})`;
        const result = await con.query(sql)
        // var id = result.insertId;        
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't insert into m_product_group");
        return null;  
    }  
}

const update = async (id, body) =>{
    try {
        const con = await db.getConnection()
        //update customer
        var sql = `Update m_product_group Set code = '${body.code}', name = '${body.name}', description = '${body.description}'
         where id = ${id}`;
        const result = await con.query(sql)        
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_product_group");
        return null;  
    }  
}

const delete_item = async (id) =>{
    try {
        const con = await db.getConnection()
        //update customer
        var sql = `Update m_product_group Set status = 0 where id = ${id}`;
        const result = await con.query(sql)        
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_product_group");
        return null;  
    }  
}

module.exports = {
    insert,
    update,
    delete_item,
    getAll
};