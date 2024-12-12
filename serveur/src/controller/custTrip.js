import CustTrip from "../model/CustTrip.js";
import Choice from "../model/CustTripChoice.js";

//AFFICHER LES DEMANDES DE VOYAGES SUR-MESURE
const getAll = async (req, res) => {
  try {
    // Récupération de toutes les demandes
    const [custTrips] = await CustTrip.findAll();

    // Renvoie les demandes en format JSON
    res.json(custTrips);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//AFFICHER TOUTES LES INFOS D'UNE DEMANDE AVEC SON ID
const getById = async (req, res) => {
  try {
    // Récupération de l'ID à partir des paramètres de l'URL
    const custTripId = req.params.id;

    // Exécute la requête pour récupérer la demande correspondant à l'ID
    const [custTrips] = await CustTrip.findById(custTripId);

    // Vérification si la demande a été trouvée
    if (!custTrips.length) {
      return res.status(404).json({
        msg: "Erreur : La demande de destination sur-mesure n'a pas été trouvée.",
      });
    }

    // Renvoie les infos de la demande en format JSON
    res.json(custTrips[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//MODIFIER LE STATUS D'UNE DEMANDE
const update = async (req, res) => {
  try {
    // Récupération de l'ID à partir des paramètres de l'URL
    const custTripId = req.params.id;
    // Récupération du nouveau statut à partir du corps de la requête
    const { status } = req.body;

    // Exécute la requête pour MAJ le status de la demande
    const [result] = await CustTrip.updateStatus(custTripId, status);

    // Vérification si la MAJ a réussi
    if (!result.affectedRows) {
      return res.status(404).json({
        msg: "Erreur : Le status de la demande de destination sur-mesure n'a pas pu être modifié.",
      });
    }
    // Renvoie une réponse JSON confirmant la MAJ
    res.json({
      msg: "Le status de la demande de destination sur-mesure a bien été modifié.",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//SUPPRIMER UNE DEMANDE
const remove = async (req, res) => {
  try {
    // Récupération de l'ID à partir des paramètres de l'URL
    const custTripId = req.params.id;
    // Exécute la requête pour supprimer la demande correspondant à l'ID
    const [result] = await CustTrip.deleteById(custTripId);

    // Si aucune demande n'a été supprimée (par ex si l'ID n'existe pas)
    if (!result.affectedRows) {
      return res.status(404).json({
        msg: "Erreur : La demande de destination sur-mesure n'a pas pu être supprimée.",
      });
    }
    // Si la demande a bien été supprimée
    res.json({
      msg: "La demande de destination sur-mesure a bien été supprimée.",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//AJOUTER UNE DEMANDE
const addRequest = async (req, res) => {
  try {
    const {
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
      user_id,
    } = req.body;

    // Validation de tout les champs requis
    if (
      !typeExperience_id ||
      !duration ||
      !budget ||
      !climate_id ||
      !accomodation_id ||
      !activity_id ||
      !location_id ||
      !culture_id ||
      !numberAdult
    ) {
      return res.status(400).json({ msg: "Tous les champs sont requis." });
    }

    // Récupérer l'user_id de la session
    // Si req.session.user est défini, utilise-le, sinon prends l'user_id du body
    const sessionUserId = req.session.user ? req.session.user.id : user_id;

    // Validation que la durée soit comprise entre 2 et 21 jours
    if (duration < 2 || duration > 21) {
      return res
        .status(400)
        .json({ msg: "La durée doit être comprise entre 2 et 21 jours." });
    }

    // Vérifier que le nombre d'adultes est au moins égal à 1
    if (numberAdult < 1) {
      return res
        .status(400)
        .json({ msg: "Il doit y avoir au moins un adulte." });
    }

    // Vérification des champs numériques
    if (
      isNaN(duration) ||
      isNaN(budget) ||
      isNaN(numberAdult) ||
      (numberChild && isNaN(numberChild)) // Vérifie numberChild uniquement s'il est défini
    ) {
      return res.status(400).json({
        msg: "Veuillez entrer des chiffres valides pour les champs requis.",
      });
    }

    // Ajout de la demande dans la BDD
    await CustTrip.add(
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
      sessionUserId
    );
    // Réponse de succès
    res.json({
      msg: "Votre demande de destination sur-mesure a bien été effectuée ! L'agence reviendra vers vous par mail dans les plus brefs délais.",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Afficher les choix des catégories des voyages sur-mesure
const getAllChoices = async (req, res) => {
  try {
    // Récupération de tous les choix
    const [typeExperience] = await Choice.getTypeExperiences();
    const [climate] = await Choice.getClimates();
    const [accomodation] = await Choice.getAccomodations();
    const [activity] = await Choice.getActivities();
    const [location] = await Choice.getLocations();
    const [culture] = await Choice.getCultures();

    // Renvoie les choix en format JSON
    res.json({
      typeExperience,
      climate,
      accomodation,
      activity,
      location,
      culture,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export { getAll, getById, update, remove, addRequest, getAllChoices };
