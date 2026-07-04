import mysql from 'mysql2/promise';

import 'dotenv/config';

const db =  mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  waitForConnections: true,
  connectionLimit: 10,
    
});

// db.connect((error) => {
//   if (error) {
//     console.log("connection error");

//   } else {
//     console.log("connection success");
//   }
// });

export default db;