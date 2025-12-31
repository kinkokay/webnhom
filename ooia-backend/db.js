const mysql = require('mysql2');
// require('dotenv').config();

// Tạo Connection Pool (tốt hơn tạo 1 connection đơn lẻ)
const pool = mysql.createPool({
 host: 'localhost',
    user: 'root',              
    password: '123456',        
    database: 'ooia_fashion',  
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();