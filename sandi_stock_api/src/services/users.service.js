const mysql = require('mysql')
const db = require('../db')

const login = async (body) =>{
    let email = body.email;
	let password = body.password;
    if (email && password) {
        try {
            const con = await db.getConnection()
            var sql = `SELECT * FROM customers WHERE email = '${email}' AND password = '${password}'`;  
            const result = await con.query(sql)
            await con.end()                
            return result
        } catch (e) {
            console.log("can't insert into customers");
            return null;  
        }  
    }
    else{
        console.log("Please enter Username and Password!");
        return null;  
    }    
}

const register = async (body) =>{
    try {
        const con = await db.getConnection()
        var sql = `INSERT INTO customers (full_name, email, mobile, password) VALUES 
        ('${body.full_name}', '${body.email}', '${body.mobile}','${body.password}')`;  
        const result = await con.query(sql)
        await con.end()    
        return result
    } catch (e) {
        console.log("can't insert into customers");
        return null;  
    }  
}

const addContact = async (body) =>{
    try {
        const con = await db.getConnection()
        var sql = `INSERT INTO contacts (full_name, email, mobile, message) VALUES 
        ('${body.full_name}', '${body.email}', '${body.mobile}','${body.message}')`;  
        const result = await con.query(sql)
        await con.end()    
        console.log(result)
        return result
    } catch (e) {
        console.log("can't insert into contacts");
        return null;  
    }  
}

module.exports = {
    login,
    register,
    addContact
};