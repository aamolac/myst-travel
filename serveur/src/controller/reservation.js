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
    // Appel de la méthode pour récupérer la réservation avec l'ID fourni
    const [reservations] = await Reservation.findById(reservationId);

    // Vérification si la réservation a été trouvée
    if (reservations.length === 0) {
      return res
        .status(404)
        .json({ msg: "Demande de réservation pas trouvée" });
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

    // Mise à jour du statut
    const result = await Reservation.updateStatus(reservationId, status);

    // Vérification si la mise à jour a réussi
    if (result[0].affectedRows === 0) {
      return res
        .status(404)
        .json({ msg: "Le status de la réservation n'a pas pu être modifié" });
    }

    // Renvoie une réponse JSON confirmant la mise à jour
    res.json({ msg: "Le status de la réservation a été modifié" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// SUPPRIMER UNE RÉSERVATION
const remove = async (req, res) => {
  try {
    // Récupération de l'ID à partir des paramètres de l'URL
    const reservationId = req.params.id;
    const result = await Reservation.deleteById(reservationId);

    // Si aucune réservation n'a été supprimée (par ex si l'ID n'existe pas)
    if (result[0].affectedRows === 0) {
      return res
        .status(404)
        .json({ msg: "La réservation n'a pas été trouvée" });
    }

    // Si la réservation a bien été supprimée
    res.json({ msg: "La réservation a été supprimée" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// AJOUTER UNE RÉSERVATION
const add = async (req, res) => {
  try {
    // Récupérer les informations de la réservation depuis le corps de la requête
    const { startDate, endDate, numberAdult, numberChild, user_id } = req.body;

    // Récupérer l'user_id de la session
    // Si req.session.user est défini, utilise-le, sinon prends l'user_id du body
    const sessionUserId = req.session.user ? req.session.user.id : user_id;

    // Récupérer l'ID de la destination mystère depuis les paramètres de l'URL
    const mystDestination_id = req.params.id;

    // Validation des champs
    if (!startDate || !endDate || !numberAdult) {
      return res.status(400).json({ msg: "Tous les champs sont requis." });
    }

    // Vérifier que la date de retour est après la date de départ
    if (endDate <= startDate) {
      return res
        .status(400)
        .json({ msg: "La date de retour doit être après la date de départ." });
    }

    // Conversion de la date de départ en objet Date
    const start = new Date(startDate);
    const today = new Date();

    // Vérifier que la date de départ est dans le futur
    if (start <= today) {
      return res
        .status(400)
        .json({ msg: "La date de départ doit être dans le futur." });
    }

    // Vérifier que le nombre d'adultes est au moins égal à 1
    if (numberAdult < 1) {
      return res
        .status(400)
        .json({ msg: "Il doit y avoir au moins un adulte." });
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
    res.status(201).json({
      msg: "Réservation effectuée avec succès ! L'agence reviendra vers vous par mail dans les plus brefs délais.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erreur lors de l'ajout de la réservation." });
  }
};

export { getAll, getById, update, remove, add };
