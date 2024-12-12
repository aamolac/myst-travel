import Reservation from "../model/Reservation.js";

//AFFICHER TOUTES LES RÉSERVATIONS
const getAll = async (req, res) => {
  try {
    // Récupération de toutes les réservations
    const [reservations] = await Reservation.findAll();

    // Renvoie les réservations en format JSON
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//AFFICHER TOUTES LES INFOS D'UNE RESERVATION AVEC SON ID
const getById = async (req, res) => {
  try {
    // Récupération de l'ID à partir des paramètres de l'URL
    const reservationId = req.params.id;

    // Exécute la requête pour récupérer la réservation correspondant à l'ID
    const [reservations] = await Reservation.findById(reservationId);

    // Vérification si la réservation a été trouvée
    if (!reservations.length) {
      return res.status(404).json({
        msg: "Erreur : La demande de réservation n'a pas été trouvée.",
      });
    }

    // Renvoie les infos de la réservation en format JSON
    res.json(reservations[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// MODIFIER LE STATUS D'UNE RÉSERVATION
const update = async (req, res) => {
  try {
    // Récupération de l'ID à partir des paramètres de l'URL
    const reservationId = req.params.id;
    // Récupération du nouveau statut à partir du corps de la requête
    const { status } = req.body;

    // Exécute la requête pour MAJ le status de la réservation
    const [result] = await Reservation.updateStatus(reservationId, status);

    // Vérification si la MAJ a réussi
    if (!result.affectedRows) {
      return res.status(404).json({
        msg: "Erreur : Le status de la réservation n'a pas pu être modifié.",
      });
    }

    // Renvoie une réponse JSON confirmant la MAJ
    res.json({ msg: "Le status de la réservation a été modifié." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// SUPPRIMER UNE RÉSERVATION
const remove = async (req, res) => {
  try {
    // Récupération de l'ID à partir des paramètres de l'URL
    const reservationId = req.params.id;

    // Exécute la requête pour supprimer la réservation correspondant à l'ID
    const [result] = await Reservation.deleteById(reservationId);

    // Si aucune réservation n'a été supprimée (par ex si l'ID n'existe pas)
    if (!result.affectedRows) {
      return res
        .status(404)
        .json({ msg: "Erreur : La réservation n'a pas pu être supprimée." });
    }

    // Si la réservation a bien été supprimée
    res.json({ msg: "La réservation a bien été supprimée." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// AJOUTER UNE RÉSERVATION
const add = async (req, res) => {
  try {
    // Récupérer les informations de la réservation depuis le corps de la requête
    const { startDate, endDate, numberAdult, numberChild, user_id } = req.body;

    // Validation des champs
    if (!startDate || !endDate || !numberAdult) {
      return res.status(400).json({ msg: "Tous les champs sont requis." });
    }

    // Récupérer l'user_id de la session
    // Si req.session.user est défini, utilise-le, sinon prends l'user_id du body
    const sessionUserId = req.session.user ? req.session.user.id : user_id;

    // Récupérer l'ID de la destination mystère depuis les paramètres de l'URL
    const mystDestination_id = req.params.id;

    // Conversion de la date de départ en objet Date
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    const oneWeekFromToday = new Date(today);
    oneWeekFromToday.setDate(today.getDate() + 7);

    // Vérifier que la date de départ est au moins 7 jours après la date actuelle
    if (start < oneWeekFromToday) {
      return res.status(400).json({
        msg: "La date de départ doit être au moins 7 jours après la date actuelle.",
      });
    }

    // Vérifier que la date de retour est après la date de départ
    if (end <= start) {
      return res
        .status(400)
        .json({ msg: "La date de retour doit être après la date de départ." });
    }

    // Vérifier que le nombre d'adultes est au moins égal à 1
    if (numberAdult < 1) {
      return res
        .status(400)
        .json({ msg: "Il doit y avoir au moins un adulte." });
    }

    // Vérification des champs numériques
    if (
      isNaN(numberAdult) ||
      (numberChild && isNaN(numberChild)) // Vérifie numberChild uniquement s'il est défini
    ) {
      return res.status(400).json({
        msg: "Veuillez entrer des chiffres valides pour les champs requis.",
      });
    }

    // Ajout de la réservation dans la BDD
    await Reservation.addReservation(
      startDate,
      endDate,
      numberAdult,
      numberChild,
      sessionUserId,
      mystDestination_id
    );

    // Réponse de succès
    res.json({
      msg: "Réservation effectuée avec succès ! L'agence reviendra vers vous par mail dans les plus brefs délais.",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export { getAll, getById, update, remove, add };
