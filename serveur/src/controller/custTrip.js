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
    // Appel de la méthode pour récupérer la demande avec l'ID fourni
    const [custTrips] = await CustTrip.findById(custTripId);

    // Vérification si la demande a été trouvée
    if (!custTrips || custTrips.length === 0) {
      return res
        .status(404)
        .json({
          msg: "La demande de destination sur-mesure n'a pas été trouvée.",
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

    // Mise à jour du statut
    const result = await CustTrip.updateStatus(custTripId, status);

    // Vérification si la mise à jour a réussi
    if (result[0].affectedRows === 0) {
      return res.status(404).json({
        msg: "Le status de la demande de destination sur-mesure n'a pas pu être modifié",
      });
    }

    // Renvoie une réponse JSON confirmant la mise à jour
    res.json({
      msg: "Le status de la demande de destination sur-mesure a bien été modifié",
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
    const result = await CustTrip.deleteById(custTripId);

    // Si aucune demande n'a été supprimée (par exemple, si l'ID n'existe pas)
    if (result[0].affectedRows === 0) {
      return res.status(404).json({
        msg: "La demande de destination sur-mesure n'a pas été trouvée",
      });
    }

    // Si la demande a bien été supprimée
    res.json({
      msg: "La demande de destination sur-mesure a bien été supprimée",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//AJOUTER UNE DEMANDE
const addRequest = async (req, res) => {
  console.log("mon req.body :", req.body);
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

    // Récupérer l'user_id de la session
    // Si req.session.user est défini, utilise-le, sinon prends l'user_id du body
    const sessionUserId = req.session.user ? req.session.user.id : user_id;

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
    res.json({
      msg: "Votre demande de destination sur-mesure a bien été effectuée ! L'agence reviendra vers vous par mail dans les plus brefs délais.",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//récupérer les choix ds cléfs étrangères
const getAllChoices = async (req, res) => {
  try {
    const [typeExperience] = await Choice.getTypeExperiences();
    const [climate] = await Choice.getClimates();
    const [accomodation] = await Choice.getAccomodations(); // Même chose pour accomodation, activity, etc.
    const [activity] = await Choice.getActivities();
    const [location] = await Choice.getLocations();
    const [culture] = await Choice.getCultures();

    res.json({
      typeExperience,
      climate,
      accomodation,
      activity,
      location,
      culture,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des options" });
  }
};

export { getAll, getById, update, remove, addRequest, getAllChoices };
