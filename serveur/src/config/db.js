import mysql from "mysql2/promise";

// CONFIGURATION DATABASE
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  //   paramètres et valeurs par défaut
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//  TEST DE LA CONNEXION
// si le test est OK, mettre le bloc en commentaire
// pool
//   .getConnection()
//   .then((connection) => {
//     console.log("Connected to database", connection.config.database);
//     connection.release();
//   })
//   .catch((error) =>
//     console.error(`Error connecting to database ${error.message}`)
//   );

export default pool;
