import mysql from "mysql2/promise";

const databaseConfig = {
  host: "http://sql12.freesqldatabase.com/",
  user: "sql12722832",
  password: "ppAt8mPckR",
  database: "sql12722832",
};

let connection;

const connectToDatabase = async () => {
  try {
    connection = await mysql.createConnection(databaseConfig);
    console.log("Connected to MySQL database");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
};

export { connectToDatabase, connection };
