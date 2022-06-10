const db = require('../db')

const getAll = async () =>{
    try {
        const con = await db.getConnection()
        const stocks = await con.query(`SELECT id, group_id, code, name, description, status FROM m_stock WHERE (status = 0 or status = 1)`)
        const stockGroups = await con.query(`SELECT id, code, name, description, parent_id FROM m_stock_group where status = 1`)
        await con.end()
    
        var childs = new Array();
        var ids = new Array();
        stockGroups.forEach(item => {
            if(!childs[item["parent_id"]]){
                childs[item["parent_id"]] = new Array();  
                ids.push(item["parent_id"].toString());
            }
            childs[item["parent_id"]].push(item);            
        });
        stockGroups.forEach(item => {
            if(childs[item["id"]]){
                item["childs"] = childs[item["id"]];
            }
        });
    
        return {
            "stockGroups": stockGroups,
            "stocks": stocks,
            "ids": ids
        }
    } catch (e) {
        console.log("can't query all stockGroups");
        return null; 
    }
}

const insert = async (body) =>{
    try {
        const con = await db.getConnection()
        //insert m_organization
        var sql = `INSERT INTO m_stock_group (code, name, description, parent_id) VALUES 
        ('${body.code}', '${body.name}','${body.description}',${body.parent_id})`;
        const result = await con.query(sql)
        // var id = result.insertId;        
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't insert into m_stock_group");
        return null;  
    }  
}

const update = async (id, body) =>{
    try {
        const con = await db.getConnection()
        //update customer
        var sql = `Update m_stock_group Set code = '${body.code}', name = '${body.name}', description = '${body.description}'
         where id = ${id}`;
        const result = await con.query(sql)        
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_stock_group");
        return null;  
    }  
}

const delete_item = async (id) =>{
    try {
        const con = await db.getConnection()
        //update customer
        var sql = `Update m_stock_group Set status = -1 where id = ${id}`;
        const result = await con.query(sql)        
        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_stock_group");
        return null;  
    }  
}

module.exports = {
    insert,
    update,
    delete_item,
    getAll
};