const mysql = require('mysql')
const db = require('../db')

const get = async (_id) => {
    try {
        const con = await db.getConnection()
        const categories = await con.query("SELECT * FROM categories")
        const products = await con.query(`SELECT A.*, B.category_id FROM products A
        LEFT JOIN product_category B on A.id = B.product_id
        WHERE A.id = ` + _id)
        const images = await con.query("SELECT * FROM product_image where product_id = " + _id)
        const properties = await con.query("SELECT A.value, B.name as property_name, B.unit as property_unit FROM `product_properties` A LEFT join properties B on A.property_id = B.id where A.product_id = " + _id)
        await con.end()
        if(products && products.length > 0)
            return {"product": products[0], "images": images, "categories": categories, "properties": properties}
        else 
            return null
    }
    catch (e) {
        console.log("can't query products with "+_id);
        return null;
    }
}

const getAll = async () =>{
    try {
        const con = await db.getConnection()
        const products = await con.query("SELECT * FROM products status = 1")
        await con.end()    
        return products
    } catch (e) {
        console.log("can't query all products");
        return null;  
    }  
}

module.exports = {
    get,
    getAll
};