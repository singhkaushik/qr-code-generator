const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const pool = mysql.createPool(dbConfig);

const query = async (sql, params) => {
  const [rows, fields] = await pool.query(sql, params);
  return rows;
};

module.exports = { query };
