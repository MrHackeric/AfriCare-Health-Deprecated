import pool from "../config/database.js";

const User = {
  create: (data) => {
    const query = `INSERT INTO users (firebase_uid, name, email) VALUES (?, ?, ?)`;
    return new Promise(async (resolve, reject) => {
      try {
        const [results] = await pool.query(query, [data.firebase_uid, data.name, data.email]);
        resolve(results);
      } catch (err) {
        reject(err);
      }
    });
  },

  findByFirebaseUID: (firebaseUID) => {
    const query = `SELECT * FROM users WHERE firebase_uid = ?`;
    return new Promise(async (resolve, reject) => {
      try {
        const [results] = await pool.query(query, [firebaseUID]);
        resolve(results);
      } catch (err) {
        reject(err);
      }
    });
  },
  updateByFirebaseUID(uid, updatedInfo){
    const query = 'UPDATE users SET ? WHERE firebase_uid = ?';
   return new Promise (async (resolve, reject)=>{
    try{
      const [results]= await pool.query(query, [updatedInfo, uid]);
      resolve(results)
    } catch(err){
      reject (err)
    }
   })
  },

  findById: (id) => {
    const query = `SELECT * FROM users WHERE id = ?`;
    return new Promise(async (resolve, reject) => {
      try {
        const [results] = await pool.query(query, [id]);
        resolve(results);
      } catch (err) {
        reject(err);
      }
    });
  },

  update: (id, data) => {
    const query = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
    return new Promise(async (resolve, reject) => {
      try {
        const [results] = await pool.query(query, [data.name, data.email, id]);
        resolve(results);
      } catch (err) {
        reject(err);
      }
    });
  },

  delete: (id) => {
    const query = `DELETE FROM users WHERE id = ?`;
    return new Promise(async (resolve, reject) => {
      try {
        const [results] = await pool.query(query, [id]);
        resolve(results);
      } catch (err) {
        reject(err);
      }
    });
  },

  findAll: () => {
    const query = `SELECT * FROM users`;
    return new Promise(async (resolve, reject) => {
      try {
        const [results] = await pool.query(query);
        resolve(results);
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default User;
