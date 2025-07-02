// db/database.js

const mysql = require('mysql');

const conn = mysql.createConnection({ 
    host: "localhost", 
    user: 'root',
    password: '',
    database: 'coffiedb'
});

conn.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL database:", err);
        return;
    }
    console.log("Connected to MySQL database.");
});

module.exports = (query, values = []) => {
    return new Promise((resolve, reject) => {
        conn.query(query, values, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};
