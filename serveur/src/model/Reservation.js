import pool from "../config/db.js";

class Reservation {
  // Requête pour afficher toutes les réservations
  static async findAll() {
    const q = `SELECT id, DATE_FORMAT (startDate, '%d/%m/%Y %H') AS startDate, DATE_FORMAT (endDate, '%d/%m/%Y %H') AS endDate, numberAdult, numberChild, user_id, mystDestination_id, DATE_FORMAT (createdDate, '%d/%m/%Y %H:%i') AS createdDate, CASE
    WHEN status=0 THEN "Non traité"
    WHEN status=1 THEN "En cours de traitement"
    ELSE "Traité"
    END AS status 
      FROM reservation
      ORDER BY createdDate DESC`;
    return await pool.query(q);
  }

  // Requête pour mettre à jour le statut d'une réservation par son ID
  static async updateStatus(id, status) {
    const q = "UPDATE reservation SET status = ? WHERE id = ?";
    return await pool.execute(q, [status, id]);
  }

  // Requête pour supprimer une réservation par son ID
  static async deleteById(id) {
    const q = "DELETE FROM reservation WHERE id = ?";
    return await pool.execute(q, [id]);
  }

  // Requête pour ajouter une réservation par un utilisateur
  static async addReservation(
    startDate,
    endDate,
    numberAdult,
    numberChild,
    user_id,
    mystDestination_id
  ) {
    const q =
      "INSERT INTO reservation (startDate, endDate, numberAdult, numberChild, user_id, mystDestination_id) VALUES (?, ?, ?, ?, ?, ?)";

    return await pool.execute(q, [
      startDate,
      endDate,
      numberAdult,
      numberChild || null,
      user_id,
      mystDestination_id,
    ]);
  }
}

export default Reservation;
