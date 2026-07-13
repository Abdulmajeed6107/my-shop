import mysql from 'mysql2/promise';

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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