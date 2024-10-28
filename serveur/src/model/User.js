import pool from "../config/db.js";

class User {
  // Requête pour afficher tous les utilisateurs
  static async findAll() {
    const q = `SELECT id, firstname, lastname, email, DATE_FORMAT (createdDate, '%d/%m/%Y %H:%i') AS createdDate 
      FROM user 
      WHERE role = 'user'
      ORDER BY lastname ASC, firstname ASC`;
    return await pool.query(q);
  }

  // Requête pour supprimer un utilisateur par son ID
  static async deleteById(id) {
    const q = "DELETE FROM user WHERE id = ?";
    return await pool.execute(q, [id]);
  }
}

export default User;
