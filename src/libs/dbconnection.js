var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'galax.be',
    user: 'admin',
    password: '*****',
    database: 'emailFeathers'
});


module.exports = connection;