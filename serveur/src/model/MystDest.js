import pool from "../config/db.js";

class MystDest {
  // Requête pour afficher toutes les destinations
  static async findAll() {
    const q = `SELECT id, title, climate, experience, activity, location, budget, recoDuration, image, alt 
      FROM mystDestination`;
    return await pool.query(q);
  }

  // Requête pour afficher toutes les infos d'une destination
  static async findById(id) {
    const q = `SELECT id, title, climate, experience, activity, location, budget, recoDuration, image, alt 
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
      climate = COALESCE(?, climate),
      experience = COALESCE(?, experience),
      activity = COALESCE(?, activity),
      location = COALESCE(?, location),
      budget = COALESCE(?, budget),
      recoDuration = COALESCE(?, recoDuration),
      image = COALESCE(?, image),
      alt = COALESCE(?, alt) 
      WHERE id = ?`;

    return await pool.execute(q, [
      fieldsToUpdate.title || null,
      fieldsToUpdate.climate || null,
      fieldsToUpdate.experience || null,
      fieldsToUpdate.activity || null,
      fieldsToUpdate.location || null,
      fieldsToUpdate.budget || null,
      fieldsToUpdate.recoDuration || null,
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
    climate,
    experience,
    activity,
    location,
    budget,
    recoDuration,
    image,
    alt
  ) {
    const q = `INSERT INTO mystDestination (title, climate, experience, activity, location, budget, recoDuration, image, alt) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    return await pool.execute(q, [
      title,
      climate,
      experience,
      activity,
      location,
      budget,
      recoDuration,
      image,
      alt,
    ]);
  }
}

export default MystDest;
