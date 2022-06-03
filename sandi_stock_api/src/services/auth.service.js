const db = require('../db')
const jwt = require("jsonwebtoken");

const login = async (body) =>{
    let email = body.email;
	let password = body.password;
    if (email && password) {
        try {
            const con = await db.getConnection()
            var sql = `SELECT * FROM m_employee WHERE account = '${email}' AND password = '${password}'`;  
            const employees = await con.query(sql)
            await con.end()       
            if (employees && employees.length > 0){
                const employee = employees[0];
                const data = {email: employee.account, password: employee.password}
                const accessToken = jwt.sign(data, 'abcde12345', {expiresIn: '3600s'});
                return { "employee": employees[0], "token": accessToken }
            }                
            else
                return null
        } catch (e) {
            return null;  
        }  
    }
    else{
        return null;  
    }    
}

module.exports = {
    login,
};