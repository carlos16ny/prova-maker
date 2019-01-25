const mysql = require('mysql');

function connection(){
    return mysql.createConnection({
        host: '127.0.0.1',
        port: 3306,
        user: "root",
        password: "2528",
        database: "provamaker"
    })
}

module.exports = () => {
    return connection;
}