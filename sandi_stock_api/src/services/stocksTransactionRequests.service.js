const db = require('../db')

const insert = async (body) => {
    try {
        const con = await db.getConnection()
        var sql = `INSERT INTO m_stock_transaction_R (
            transaction_number, 
            stock_id, 
            transaction_type,
            deliver_unit_code,
            deliver_unit_name,
            deliver_person, 
            transaction_date, 
            transaction_explain, 
            transaction_attach,
            status) VALUES 
        (
            '${body.transaction_number}', 
            ${body.stock_id},
            ${body.transaction_type},
            '${body.deliver_unit_code}',
            '${body.deliver_unit_name}',
            '${body.deliver_person}',
            '${body.transaction_date}',
            '${body.transaction_explain}',
            '${body.transaction_attach}',
             ${body.transaction_status}
        )`;
        const result = await con.query(sql)
        var transaction_id = result.insertId;

        await Promise.all(body.materials.map(async (material) => {
            var sqlDetail = `INSERT INTO m_stock_transaction_RD (
                transaction_id, 
                material_code, 
                quantity,
                tk_co, 
                tk_no) 
            VALUES 
            (
                ${transaction_id}, 
                '${material.code}',
                ${parseFloat(material.quantity.replaceAll(',', ''))},
                '${material.tk_co}',
                '${material.tk_no}'
            )`;
            await con.query(sqlDetail);
        }));

        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't insert into m_stock_transaction_R");
        return null;
    }
}

const update = async (id, body) => {
    try {
        const con = await db.getConnection()
        //update m_stock
        var sql = `Update m_stock_transaction_R Set 
        transaction_number = '${body.transaction_number}', 
        stock_id = ${body.stock_id}, 
        transaction_type = ${body.transaction_type}, 
        deliver_unit_code = '${body.deliver_unit_code}',
        deliver_unit_name = '${body.deliver_unit_name}',
        deliver_person = '${body.deliver_person}',
        transaction_date = '${body.transaction_date}',
        transaction_explain = '${body.transaction_explain}',
        transaction_attach = '${body.transaction_attach}',
        status = ${body.transaction_status}
        where id = ${id}`;
        const result = await con.query(sql)

        await con.query('Delete from m_stock_transaction_RD where transaction_id = ' + id)

        await Promise.all(body.materials.map(async (material) => {
            var sqlDetail = `INSERT INTO m_stock_transaction_RD (
                transaction_id, 
                material_code, 
                quantity,
                tk_co, 
                tk_no) 
            VALUES 
            (
                ${id}, 
                '${material.code}',
                ${parseFloat(material.quantity.replaceAll(',', ''))},
                '${material.tk_co}',
                '${material.tk_no}'
            )`;
            await con.query(sqlDetail);
        }));

        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_stock_transaction_R");
        return null;
    }
}

const getAll = async () => {
    try {
        const con = await db.getConnection()
        const stock_transactions = await con.query(`SELECT * FROM m_stock_transaction_R where (status = 0 or status = 1 or status = 2 or status = 3)`)
        await con.end()
        return stock_transactions
    } catch (e) {
        console.log("can't query all m_stock_transaction_R");
        return null;
    }
}

const get = async (_id) => {
    try {
        const con = await db.getConnection()
        const transactions = await con.query(`SELECT A.*, B.name as stock_name FROM m_stock_transaction_R as A
        left join m_stock as B on A.stock_id = B.id WHERE A.id = ` + _id)
        const transaction_details = await con.query(`SELECT *, B.name as material_name FROM m_stock_transaction_RD as A
        left join m_product as B on A.material_code = B.code
        where A.transaction_id = ` + _id)
        await con.end()
        if (transactions && transactions.length > 0)
            return { "transaction": transactions[0], "transaction_details": transaction_details }
        else
            return null
    } catch (e) {
        console.log("can't query transactions by id");
        return null;
    }
}


function padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

const getLastNumber = async () => {
    try {
        const con = await db.getConnection()
        const stock_transactions = await con.query(`SELECT transaction_number FROM m_stock_transaction_R order by created_at desc limit 1`)
        await con.end()
        if (stock_transactions && stock_transactions.length > 0)
        {
            var old_number = stock_transactions[0].transaction_number
            var temp = old_number.replace('PĐNNK', '')
            var tempInt = parseInt(temp) + 1
            return "PĐNNK" + padLeadingZeros(tempInt, 5)
        }            
        else
            return "PĐNNK00001"
    } catch (e) {
        console.log("can't query last number from m_stock_transaction");
        return null;
    }
}

module.exports = {
    insert,
    update,
    getAll,
    get,
    getLastNumber
};