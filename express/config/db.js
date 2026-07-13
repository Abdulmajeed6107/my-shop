import mysql from 'mysql2/promise';

import 'dotenv/config';

const db = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  waitForConnections: true,
  connectionLimit: 10,
  port: 4000,
  ssl: 'Amazon RDS'
});

// db.connect((error) => {
//   if (error) {
//     console.log("connection error");

//   } else {
//     console.log("connection success");
//   }
// });

export default db;