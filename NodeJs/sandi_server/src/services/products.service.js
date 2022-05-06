const mysql = require('mysql')
const db = require('../db')

const get = async (_id) => {
    try {
        const con = await db.getConnection()
        const products = await con.query(`SELECT A.*, B.category_id FROM products A
        LEFT JOIN product_category B on A.id = B.product_id
        WHERE A.id = ` + _id)
        const images = await con.query("SELECT * FROM product_image where product_id = " + _id)
        const attachments = await con.query("SELECT * FROM product_attachments where product_id = " + _id)
        const properties = await con.query("SELECT A.value, B.name as property_name, B.unit as property_unit FROM `product_properties` A LEFT join properties B on A.property_id = B.id where A.product_id = " + _id)
        await con.end()
        if(products && products.length > 0)
            return {"product": products[0], "images": images, "properties": properties, "attachments": attachments}
        else 
            return null
    }
    catch (e) {
        console.log("can't query products with "+_id);
        return null;
    }
}

const getAll = async (category_id, search, opt1, opt2, opt3, page, per_page, order_by) =>{
    try {
        const con = await db.getConnection()
        //get all product link with category
        //get current category and all childs
        const query = "select  id, parent_id from (select id, parent_id, status from categories  where status = 1 order by parent_id, id) products_sorted,(select @pv := "+category_id+") initialisation where   find_in_set(parent_id, @pv) and     length(@pv := concat(@pv, ',', id))";
        const category_childs = await con.query(query) 
        var category_ids = category_childs.map(category_child => category_child.id);
        category_ids.push(category_id)
        var product_query = ``;
        product_query = `SELECT distinct A.id, A.name, A.image, A.url_seo, A.short_description, A.is_new FROM product_category B 
            right join products A on A.id = B.product_id 
            where B.category_id IN (`+category_ids.join(',')+`) and (A.name like '%`+ search+`%'`; 
        if(opt1){
            product_query = product_query + ` or A.long_description like '%`+ search+`%'`;
        }
        if(opt2){
            product_query = product_query + ` or A.user_manual like '%`+ search+`%'`;
        }
        if(opt3){
            product_query = product_query + ` or A.application like '%`+ search+`%'`;
        }
        product_query = product_query + `) and A.status = 1`;

        var query_count_product = `Select COUNT(*) as product_count from (`+product_query+`) A`;
        const product_count = await con.query(query_count_product)

        if(order_by){            
            switch(order_by){
                case "1":
                    product_query =  product_query + ` ORDER by name asc `;
                    break;
                case "2":
                    product_query =  product_query + ` ORDER by name desc `;
                    break;
                case "3":
                    product_query =  product_query + ` ORDER by id asc `;
                    break;
            }            
        }

        if(per_page && page && page > 0){
            const offset = (page - 1) * per_page;
            product_query = product_query + ` limit `;
            product_query = product_query + offset;
            product_query = product_query + `,`;
            product_query = product_query + per_page;
        }

        const products = await con.query(product_query)
        await con.end()
        return {
            "products": products, 
            "product_count": product_count[0]["product_count"]
        }
    } catch (e) {
        console.log("can't query all products");
        return null;  
    }  
}

const requestQuotation = async (body) =>{
    try {
        const con = await db.getConnection()
        var sql = `INSERT INTO request_quotation (email,property_names,property_values) VALUES 
        ('${body.email}', '${body.properties}', '${body.values}')`;  
        const result = await con.query(sql)
        await con.end()  
        return result
    } catch (e) {
        console.log(e.message);
        return null;  
    }  
}

module.exports = {
    get,
    getAll,
    requestQuotation
};