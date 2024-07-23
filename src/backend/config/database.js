import mysql from "mysql2/promise";

const databaseConfig = {
  host: "localhost",
  user: "root",
  password: "Denis/s13",
  database: "africare",
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
