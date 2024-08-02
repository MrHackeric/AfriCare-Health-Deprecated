import mysql from "mysql2/promise";

const databaseConfig = {
  host: "sql12.freesqldatabase.com",
  user: "sql12722832",
  password: "ppAt8mPckR",
  database: "sql12722832",
  // host: "localhost",
  // user: "root",
  // password: "COLIHUDatat2020",
  // database: "africare",
};

// Create a connection pool
const pool = mysql.createPool(databaseConfig);

export default pool;
