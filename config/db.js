const pg = require('pg');
const { database, password } = require('pg/lib/defaults');
const dotenv = require('dotenv')

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
})

pool.on("connect", () => {
  console.log("Connection established with database")
}); 

module.exports = pool;