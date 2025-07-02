// // db/database.js

// const mysql = require('mysql');

// const conn = mysql.createConnection({ 
//     host: "localhost", 
//     user: 'root',
//     password: '',
//     database: 'coffiedb'
// });

// conn.connect((err) => {
//     if (err) {
//         console.error("Error connecting to MySQL database:", err);
//         return;
//     }
//     console.log("Connected to MySQL database.");
// });

// module.exports = (query, values = []) => {
//     return new Promise((resolve, reject) => {
//         conn.query(query, values, (error, result) => {
//             if (error) {
//                 return reject(error);
//             }
//             resolve(result);
//         });
//     });
// };

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://postgres.hyvsghuepwmknddqrggd:niorsereen%4018@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres",
  ssl: { rejectUnauthorized: false },
});

pool.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to Supabase:", err.stack);
  } else {
    console.log("✅ Connected to Supabase PostgreSQL!");
  }
});

module.exports = (query, values = []) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, result) => {
      if (err) {
        console.error("❌ Query error:", err.stack);
        return reject(err);
      }
      resolve(result.rows);
    });
  });
};
