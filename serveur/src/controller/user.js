import User from "../model/User.js";

// AFFICHER TOUS LES UTILISATEURS
const getAll = async (req, res) => {
  try {
    // Récupération de tous les utilisateurs avec le rôle "user"
    const [users] = await User.findAll();

    // Vérifie si des utilisateurs ont été trouvés
    if (users.length === 0) {
      return res.status(404).json({ msg: "Pas d'utilisateur trouvé" });
    }
    // Renvoie les utilisateurs en format JSON
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// SUPPRIMER UN UTILISATEUR
const remove = async (req, res) => {
  try {
    // Récupération de l'ID à partir des paramètres de l'URL
    const userId = req.params.id;
    const result = await User.deleteById(userId);

    // Si aucun utilisateur n'a été supprimé (par ex si l'ID n'existe pas)
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "L'utilisateur n'a pas été trouvé" });
    }

    // Si l'utilisateur a bien été supprimé
    res.json({ msg: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export { getAll, remove };
