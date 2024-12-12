import pool from "../config/db.js";

class Auth {
  // Ajout d'un nouvel utilisateur
  static async add(firstname, lastname, email, password) {
    const q =
      "INSERT INTO user (firstname, lastname, email, password) VALUES (?, ?, ?, ?)";
    return await pool.execute(q, [firstname, lastname, email, password]);
  }
  // Requête SQL afin de vérifier si l'utilisateur existe
  static async getOneByEmail(email) {
    const q =
      "SELECT id, firstname, lastname, email, password, role FROM `user` WHERE email = ?";
    return await pool.execute(q, [email]);
  }
}

export default Auth;
