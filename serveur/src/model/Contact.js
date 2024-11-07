import pool from "../config/db.js";

class Contact {
  // Requête pour afficher toutes les demandes de contact
  static async findAll() {
    const q = `SELECT contact.id, email, objectContact.choice, message, DATE_FORMAT (publishDate, '%d/%m/%Y %H:%i') AS publishDate, CASE
    WHEN status = 0 THEN "Non lu"
      WHEN status = 1 THEN "Lu"
      ELSE "Répondu"
  END AS status 
      FROM contact 
      JOIN objectContact ON contact.objectContact_id = objectContact.id
      ORDER BY publishDate DESC`;
    return await pool.query(q);
  }

  // Requête pour afficher toutes les infos d'une demande
  static async findById(id) {
    const q = `SELECT email, objectContact.choice, message, DATE_FORMAT (publishDate, '%d/%m/%Y %H:%i') AS publishDate, CASE
    WHEN status = 0 THEN "Non lu"
      WHEN status = 1 THEN "Lu"
      ELSE "Répondu"
  END AS status 
      FROM contact 
      JOIN objectContact ON contact.objectContact_id = objectContact.id
      WHERE contact.id = ?`;
    return await pool.execute(q, [id]);
  }

  // Requête pour mettre à jour le statut d'une demande de contact par son ID
  static async updateStatus(id, status) {
    const q = "UPDATE contact SET status = ? WHERE id = ?";
    return await pool.execute(q, [status, id]);
  }

  // Requête pour supprimer une demande de contact par son ID
  static async deleteById(id) {
    const q = "DELETE FROM contact WHERE id = ?";
    return await pool.execute(q, [id]);
  }

  // Requête pour ajouter une demande de contact par un visiteur
  static async add(email, objectContact_id, message) {
    const q =
      "INSERT INTO contact (email, objectContact_id, message) VALUES (?, ?, ?)";
    return await pool.execute(q, [email, objectContact_id, message]);
  }

  // Requête pour afficher tous les objets de demandes de contact
  static async findAllObjects() {
    const q = `SELECT id, choice FROM objectContact`;
    return await pool.query(q);
  }
}

export default Contact;
