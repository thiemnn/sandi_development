const db = require('../db')

const insert = async (body) => {
    try {
        const con = await db.getConnection()
        var sql = `INSERT INTO m_stock_transaction (
            transaction_R_id,
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
            ${body.transaction_R_id},
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

        await con.query(`update m_stock_transaction_R set status = 3 where id = ${body.transaction_R_id}`)

        var transaction_id = result.insertId;

        await Promise.all(body.materials.map(async (material) => {
            var sqlDetail = `INSERT INTO m_stock_transaction_D (
                transaction_id, 
                material_code, 
                quantity_expect,
                quantity,
                price,
                position_code,
                tk_co, 
                tk_no) 
            VALUES 
            (
                ${transaction_id}, 
                '${material.code}',
                ${parseFloat(material.quantity_expect.replaceAll(',', ''))},
                ${parseFloat(material.quantity.replaceAll(',', ''))},
                ${parseFloat(material.price.replaceAll(',', ''))},
                '${material.position}',
                '${material.tk_co}',
                '${material.tk_no}'
            )`;
            await con.query(sqlDetail);
        }));

        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't insert into m_stock_transaction");
        return null;
    }
}

const update = async (id, body) => {
    try {
        const con = await db.getConnection()
        //update m_stock
        var sql = `Update m_stock_transaction Set 
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

        await con.query('Delete from m_stock_transaction_D where transaction_id = ' + id)

        await Promise.all(body.materials.map(async (material) => {
            var sqlDetail = `INSERT INTO m_stock_transaction_D (
                transaction_id, 
                material_code, 
                quantity,
                quantity_expect,
                price,
                position_code,
                tk_co, 
                tk_no) 
            VALUES 
            (
                ${id}, 
                '${material.code}',
                ${parseFloat(material.quantity.replaceAll(',', ''))},
                ${parseFloat(material.quantity_expect.replaceAll(',', ''))},
                ${parseFloat(material.price.replaceAll(',', ''))},
                '${material.position}',
                '${material.tk_co}',
                '${material.tk_no}'
            )`;
            await con.query(sqlDetail);
        }));

        //close connection
        await con.end()
        return result
    } catch (e) {
        console.log("can't update into m_stock_transaction");
        return null;
    }
}

const getAll = async () => {
    try {
        const con = await db.getConnection()
        const stock_transactions = await con.query(`SELECT * FROM m_stock_transaction where (status >= 0)`)
        await con.end()
        return stock_transactions
    } catch (e) {
        console.log("can't query all m_stock_transaction");
        return null;
    }
}

const get = async (_id) => {
    try {
        const con = await db.getConnection()
        const transactions = await con.query(`SELECT A.*, B.name as stock_name FROM sandi_stock_db.m_stock_transaction as A
        left join m_stock as B on A.stock_id = B.id WHERE A.id = ` + _id)
        const transaction_details = await con.query(`SELECT *, B.name as material_name, C.name as position_name FROM sandi_stock_db.m_stock_transaction_D as A
        left join m_product as B on A.material_code = B.code
        left join m_stock_shelfs as C on A.position_code = C.code where A.transaction_id = ` + _id)
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

module.exports = {
    insert,
    update,
    getAll,
    get
};