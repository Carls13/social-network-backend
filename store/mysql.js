const mysql = require('mysql');

const config = require('./../config');
const errors = require('../network/errors');
const { connect } = require('../api/components/user/network');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

// Connection
let connection;

const handleCon = () => {
    connection = mysql.createConnection(dbconf);

    connection.connect((error) => {
        if (error) {
            console.error('dbError', error);
            setTimeout(handleCon, 2000);
        }
        console.log('Db connected')
    })

    connection.on('error', error => {
        console.error('dbError', error);

        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw error;
        }
    })
};

handleCon();

const list = (table) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

const get = (table, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

const insert = (table, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

const update = (table, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

const upsert = async (table, query) => {
    console.log('QUERY: ', query, table)
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [query, query], (error, data) => {
        if (error) {
            return reject(error)
        }
        resolve(data)
        })  
    }
)}

const query = (table, query) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
            if (err) reject(err);
            resolve(res[0] || null);
        })
    })
}

const following = (table, query) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} JOIN user ON ${table}.user_to = user.id`, query, (err, res) => {
            if (err) reject(err);
            resolve(res || null);
        })
    })
}

const followers = (table, query) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} JOIN user ON ${table}.user_from = user.id`, query, (err, res) => {
            if (err) reject(err);
            resolve(res || null);
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    query,
    following,
    followers
}