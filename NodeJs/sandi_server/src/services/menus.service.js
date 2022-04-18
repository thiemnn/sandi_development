const mysql = require('mysql')
const db = require('../db')

const getAll = async () =>{
    console.log('get all menus')
    try {
        const con = await db.getConnection()
        const categories = await con.query("SELECT A.id, A.name, A.type, A.parent_id, A.relation_id, B.url_seo as url_seo FROM `menus` A left join url_seo_list B on A.type = B.url_type and A.relation_id = B.relation_id  where A.status = 1 order by A.order_display") 
        await con.end()
    
        var childs = new Array();
        categories.forEach(item => {
            if(!childs[item["parent_id"]]){
                childs[item["parent_id"]] = new Array();  
            }
            childs[item["parent_id"]].push(item);
        });
        categories.forEach(item => {
            if(childs[item["id"]]){
                item["childs"] = childs[item["id"]];
            }
        });
        
        return childs[0]
    } catch (e) {
        console.log("can't query all menus");
        return null; 
    }   
}

module.exports = {
    getAll
};