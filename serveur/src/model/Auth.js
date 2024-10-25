import pool from "../config/db.js";

class Auth {
  // Ajout d'un nouvel utilisateur avec prénom, nom, email et mot de passe haché
  static async add(firstname, lastname, email, password) {
    const q =
      "INSERT INTO user (firstname, lastname, email, password) VALUES (?, ?, ?, ?)";
    await pool.execute(q, [firstname, lastname, email, password]);
  }
  // Requête SQL afin de vérifier si l'utilisateur existe
  static async getOneByEmail(email) {
    // Requête SQL pour récupérer l'utilisateur ayant l'email spécifié
    const q =
      "SELECT id, firstname, lastname, email, password, role FROM `user` WHERE email = ?";
    // Exécution de la requête SQL avec l'email fourni en paramètre
    // pool.execute exécute la requête et renvoie un tableau contenant les résultats
    // On destructure la première ligne du tableau (qui contient les données de l'utilisateur) dans `user`
    return await pool.execute(q, [email]);
    // return user;
  }

  static async getUserInfoById(id) {
    const q =
      "SELECT firstname, lastname, email, password, role FROM user WHERE user.id = ?";
    return await pool.execute(q, [id]);
  }
}

export default Auth;
