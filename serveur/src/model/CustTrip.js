import pool from "../config/db.js";

class CustTrip {
  // Requête pour afficher toutes les demandes de destination sur-mesure
  static async findAll() {
    const q = `SELECT customizedTrip.id, DATE_FORMAT (customizedTrip.createdDate, '%d/%m/%Y %H:%i') AS createdDate, CASE 
    WHEN status = 0 THEN "Non traité" 
    WHEN status = 1 THEN "En cours de traitement" ELSE "Traité"
END AS status, customizedTrip.user_id, user.email AS userEmail
    FROM customizedTrip
    JOIN user ON customizedTrip.user_id = user.id
    ORDER BY customizedTrip.createdDate DESC`;
    return await pool.query(q);
  }

  // Requête pour afficher toutes les infos d'une demande de destination sur-mesure par son ID
  static async findById(id) {
    const q = `SELECT customizedTrip.id, typeExperience.choice AS typeExperienceChoice, customizedTrip.duration, customizedTrip.budget, climate.choice AS climateChoice, accomodation.choice AS accomodationChoice, 
    activity.choice AS activityChoice, location.choice AS locationChoice, customizedTrip.numberAdult, customizedTrip.numberChild, culture.choice AS cultureChoice, customizedTrip.restriction, DATE_FORMAT (customizedTrip.createdDate, '%d/%m/%Y %H:%i') AS createdDate, CASE 
    WHEN status = 0 THEN "Non traité" 
    WHEN status = 1 THEN "En cours de traitement" ELSE "Traité"
END AS status, customizedTrip.user_id, user.email AS userEmail
    FROM customizedTrip
    JOIN typeExperience ON customizedTrip.typeExperience_id = typeExperience.id
    JOIN climate ON customizedTrip.climate_id = climate.id
    JOIN accomodation ON customizedTrip.accomodation_id = accomodation.id
    JOIN activity ON customizedTrip.activity_id = activity.id
    JOIN location ON customizedTrip.location_id = location.id
    JOIN culture ON customizedTrip.culture_id = culture.id
    JOIN user ON customizedTrip.user_id = user.id
    WHERE customizedTrip.id = ?
    ORDER BY customizedTrip.createdDate DESC`;
    return await pool.execute(q, [id]);
  }

  // Requête pour mettre à jour le statut d'une demande de destination sur-mesure par son ID
  static async updateStatus(id, status) {
    const q = `UPDATE customizedTrip SET status = ? WHERE id = ?`;
    return await pool.execute(q, [status, id]);
  }

  // Requête pour supprimer une demande de destination sur-mesure par son ID
  static async deleteById(id) {
    const q = "DELETE FROM customizedTrip WHERE id = ?";
    return await pool.execute(q, [id]);
  }

  // Requête pour ajouter une demande de destination sur-mesure par un utilisateur
  static async add(
    typeExperience_id,
    duration,
    budget,
    climate_id,
    accomodation_id,
    activity_id,
    location_id,
    numberAdult,
    numberChild,
    culture_id,
    restriction,
    user_id
  ) {
    const q = `INSERT INTO customizedTrip (typeExperience_id, duration, budget, climate_id, accomodation_id, activity_id, location_id, numberAdult, numberChild, culture_id, restriction, user_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    return await pool.execute(q, [
      typeExperience_id,
      duration,
      budget,
      climate_id,
      accomodation_id,
      activity_id,
      location_id,
      numberAdult,
      numberChild || null,
      culture_id,
      restriction || null,
      user_id,
    ]);
  }
}

export default CustTrip;
