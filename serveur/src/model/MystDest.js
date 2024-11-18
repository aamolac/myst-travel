import pool from "../config/db.js";

class MystDest {
  // Requête pour afficher toutes les destinations
  static async findAll() {
    const q = `SELECT id, title, climate, accomodation, activity, continent, budget, minDuration, maxDuration, image, alt, CASE
    WHEN status = 0 THEN "En ligne"
      ELSE "Hors ligne"
  END AS status  
      FROM mystDestination`;
    return await pool.query(q);
  }

  // Requête pour afficher toutes les infos d'une destination
  static async findById(id) {
    const q = `SELECT id, title, climateClue, climate, experienceClue, accomodation, activityClue, activity, locationClue, continent, budget, minDuration, maxDuration, image, alt 
      FROM mystDestination 
      WHERE id = ?`;
    return await pool.execute(q, [id]);
  }

  // Requête pour modifier une destination par son ID
  static async update(id, fieldsToUpdate) {
    // Construction de la requête SQL pour mettre à jour uniquement les champs fournis
    //COALESCENCE : signifie "si la valeur n'est pas donnée, garde la valeur actuelle"
    const q = `UPDATE mystDestination 
    SET title = COALESCE(?, title),
      climateClue = COALESCE(?, climateClue),
      climate = COALESCE(?, climate),
      experienceClue = COALESCE(?, experienceClue),
      accomodation = COALESCE(?, accomodation),
      activityClue = COALESCE(?, activityClue),
      activity = COALESCE(?, activity),
      locationClue = COALESCE(?, locationClue),
      continent = COALESCE(?, continent),
      budget = COALESCE(?, budget),
      minDuration = COALESCE(?, minDuration),
      maxDuration = COALESCE(?, maxDuration),
      image = COALESCE(?, image),
      alt = COALESCE(?, alt) 
      WHERE id = ?`;

    return await pool.execute(q, [
      fieldsToUpdate.title || null,
      fieldsToUpdate.climateClue || null,
      fieldsToUpdate.climate || null,
      fieldsToUpdate.experienceClue || null,
      fieldsToUpdate.accomodation || null,
      fieldsToUpdate.activityClue || null,
      fieldsToUpdate.activity || null,
      fieldsToUpdate.locationClue || null,
      fieldsToUpdate.continent || null,
      fieldsToUpdate.budget || null,
      fieldsToUpdate.minDuration || null,
      fieldsToUpdate.maxDuration || null,
      fieldsToUpdate.image || null,
      fieldsToUpdate.alt || null,
      id,
    ]);
  }

  // Requête pour supprimer une destination par son ID
  static async deleteById(id) {
    const q = "DELETE FROM mystDestination WHERE id = ?";
    return await pool.execute(q, [id]);
  }

  // Requête pour ajouter une destination
  static async add(
    title,
    climateClue,
    climate,
    experienceClue,
    accomodation,
    activityClue,
    activity,
    locationClue,
    continent,
    budget,
    minDuration,
    maxDuration,
    image,
    alt
  ) {
    const q = `INSERT INTO mystDestination (title, climateClue, climate, experienceClue, accomodation, activityClue, activity, locationClue, continent, budget, minDuration, maxDuration, image, alt) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    return await pool.execute(q, [
      title,
      climateClue,
      climate,
      experienceClue,
      accomodation,
      activityClue,
      activity,
      locationClue,
      continent,
      budget,
      minDuration,
      maxDuration,
      image,
      alt,
    ]);
  }

  // Requête pour mettre à jour le statut d'une destination par son ID
  static async updateStat(id, status) {
    const q = "UPDATE mystDestination SET status = ? WHERE id = ?";
    return await pool.execute(q, [status, id]);
  }
}

export default MystDest;
