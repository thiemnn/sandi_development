const mysql = require('mysql')
const db = require('./../db')

const get = async (_id, filter_options, page, per_page, order_by) => {
    try {
        const con = await db.getConnection()
        const category = await con.query("SELECT * FROM categories where id = " + _id)
        //get all product link with category
        //get current category and all childs
        const query = "select  id, parent_id from (select * from categories  where status = 1 order by parent_id, id) products_sorted,(select @pv := "+_id+") initialisation where   find_in_set(parent_id, @pv) and     length(@pv := concat(@pv, ',', id))";
        const category_childs = await con.query(query) 
        var category_ids = category_childs.map(category_child => category_child.id);
        category_ids.push(_id)
        var product_query = ``;
        var filter_option_ids = Array();
        if(filter_options){
            product_query = `SELECT A.*, B.category_id FROM product_category B 
            right join products A on A.id = B.product_id 
            left join product_filter_options C on A.id = C.product_id
            where B.category_id IN (`+category_ids.join(',')+`)  and A.status = 1 and C.filter_option_id IN(`+filter_options+`)`; 
            //GROUP BY(A.id)`;
            filter_option_ids = filter_options.split(',');
        } else{
            product_query = `SELECT A.*, B.category_id FROM product_category B 
            right join products A on A.id = B.product_id 
            where B.category_id IN (`+category_ids.join(',')+`)  and A.status = 1`; 
            //GROUP BY(A.id)`;
            filter_option_ids = Array();
        }

        //console.log(product_query)
        var query_count_product = `Select COUNT(*) as product_count from (`+product_query+`) A`;
        const product_count = await con.query(query_count_product)

        if(order_by){
            product_query =  product_query + ` ORDER by `;
            product_query =  product_query + order_by;
        }
        if(per_page && page && page > 0){
            const offset = (page - 1) * per_page;
            product_query = product_query + ` limit `;
            product_query = product_query + offset;
            product_query = product_query + `,`;
            product_query = product_query + per_page;
        }

        const products = await con.query(product_query)
        const query_filters = `SELECT A.name as filter_name, B.id as option_id, B.name as option_name from filters A 
        LEFT JOIN filter_options B on A.id = B.filter_id 
        RIGHT JOIN filters_categories C on A.id = C.filter_id
        where C.category_id = ` + _id + ` and B.status = 1 and A.status = 1 ORDER by A.order_display, A.name, B.order_display`;
        //console.log(query_filters)
        const filters = await con.query(query_filters);
        await con.end()
        return {
            "category": category[0], 
            "products": products, 
            "filters": filters, 
            "filter_option_ids": filter_option_ids, 
            "product_count": product_count[0]["product_count"]
        }
    }
    catch (e) {
        console.log("can't query categories with "+_id + e.message);
        return null;
    }
}

const getDirectChild = async (_id) =>{
    try {
        const con = await db.getConnection()
        const categories = await con.query("SELECT * FROM categories where parent_id = " + _id)
        await con.end()
    
        return categories
    } catch (e) {
        console.log("can't query all categories");
        return null; 
    }   
}

const getAll = async () =>{
    console.log('get all categories')
    try {
        const con = await db.getConnection()
        const categories = await con.query("SELECT * FROM categories  where status = 1")
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
    
        return {
            "categories": childs[0], 
            "original_categories": categories
        }
    } catch (e) {
        console.log("can't query all categories");
        return null; 
    }   
}

module.exports = {
    get,
    getAll,
    getDirectChild
};