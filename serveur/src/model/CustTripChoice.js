import pool from "../config/db.js";

class Choice {
  // Choix des catégories demandées
  static async getTypeExperiences() {
    const q = "SELECT id, choice FROM typeExperience";
    return await pool.query(q);
  }

  static async getClimates() {
    const q = "SELECT id, choice FROM climate";
    return await pool.query(q);
  }

  static async getAccomodations() {
    const q = "SELECT id, choice FROM accomodation";
    return await pool.query(q);
  }

  static async getActivities() {
    const q = "SELECT id, choice FROM activity";
    return await pool.query(q);
  }

  static async getLocations() {
    const q = "SELECT id, choice FROM location";
    return await pool.query(q);
  }

  static async getCultures() {
    const q = "SELECT id, choice FROM culture";
    return await pool.query(q);
  }
}

export default Choice;
