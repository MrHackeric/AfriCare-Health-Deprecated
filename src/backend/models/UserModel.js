import { connectToDatabase, connection } from "../config/database.js";

const User = {
  create: (data) => {
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    return new Promise((resolve, reject) => {
      connectToDatabase.query(
        query,
        [data.name, data.email, data.password],
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
    });
  },
  findByEmail: (email) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [email], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },
  findById: (id) => {
    const query = `SELECT * FROM Users WHERE id = ?`;
    return new Promise((resolve, reject) => {
      connectToDatabase.query(query, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },
  updatePassword: (email, data) => {
    const query = `UPDATE users SET password =? WHERE email =?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [data.password, email], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },
  update: (id, data) => {
    const query = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
      connection.query(
        query,
        [data.username, data.password, data.email, data.role, id],
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
    });
  },
  delete: (id) => {
    const query = `DELETE FROM users WHERE id = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },
  findAll: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Users`;
      connection.query(query, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
};

export default User;
