import pool from "../config/db.js";

class Reservation {
  // Requête pour afficher toutes les réservations
  static async findAll() {
    const q = `SELECT reservation.id, reservation.user_id, reservation.mystDestination_id, DATE_FORMAT (reservation.createdDate, '%d/%m/%Y %H:%i') AS createdDate, CASE
    WHEN reservation.status=0 THEN "Non traité"
    WHEN reservation.status=1 THEN "En cours de traitement"
    ELSE "Traité"
    END AS reservationStatus, user.email AS userEmail, mystDestination.title AS mystDestTitle 
      FROM reservation
      JOIN user ON reservation.user_id = user.id
      JOIN mystDestination ON reservation.mystDestination_id = mystDestination.id
      ORDER BY createdDate DESC`;
    return await pool.query(q);
  }

  // Requête pour afficher toutes les infos de la réservation par son ID
  static async findById(id) {
    const q = `SELECT reservation.id, DATE_FORMAT (startDate, '%d/%m/%Y') AS startDate, DATE_FORMAT (endDate, '%d/%m/%Y') AS endDate, numberAdult, numberChild, reservation.user_id, reservation.mystDestination_id, DATE_FORMAT (reservation.createdDate, '%d/%m/%Y %H:%i') AS createdDate, CASE
    WHEN reservation.status=0 THEN "Non traité"
    WHEN reservation.status=1 THEN "En cours de traitement"
    ELSE "Traité"
    END AS reservationStatus, user.email AS userEmail, mystDestination.title AS mystDestTitle 
      FROM reservation
      JOIN user ON reservation.user_id = user.id
      JOIN mystDestination ON reservation.mystDestination_id = mystDestination.id
      WHERE reservation.id = ?
      ORDER BY createdDate DESC`;
    return await pool.execute(q, [id]);
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
