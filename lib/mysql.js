import { createPool } from "mysql";
console.table({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});
// 连接数据库
const pool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// 查询数据
export default  (sql) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, (error, results) => {
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        if (results && results.length > 0) {
          resolve(results);
        } else {
          resolve(null); // or reject(new Error("No results found"));
        }
      });
    });
  });
};

