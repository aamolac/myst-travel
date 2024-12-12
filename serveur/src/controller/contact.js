import Contact from "../model/Contact.js";

//AFFICHER TOUTES LES DEMANDES
const getAll = async (req, res) => {
  try {
    // Récupération de toutes les demandes
    const [contacts] = await Contact.findAll();

    // Renvoie les demandes en format JSON
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//AFFICHER TOUTES LES INFOS D'UNE DEMANDE AVEC SON ID
const getById = async (req, res) => {
  try {
    // Récupération de l'ID à partir des paramètres de l'URL
    const contactId = req.params.id;

    // Exécute la requête pour récupérer la demande correspondant à l'ID
    const [contacts] = await Contact.findById(contactId);

    // Vérification si la demande a été trouvée
    if (!contacts.length) {
      return res
        .status(404)
        .json({ msg: "Erreur : La demande de contact n'a pas été trouvée." });
    }
    // Renvoie les infos de la demande en format JSON
    res.json(contacts[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//MODIFIER LE STATUS D'UNE DEMANDE
const update = async (req, res) => {
  try {
    // Récupération de l'ID à partir des paramètres de l'URL
    const contactId = req.params.id;

    // Récupération du nouveau statut à partir du corps de la requête
    const { status } = req.body;

    // Exécute la requête pour MAJ le status de la demande
    const [result] = await Contact.updateStatus(contactId, status);

    // Vérification si la MAJ a réussi
    if (!result.affectedRows) {
      return res.status(404).json({
        msg: "Erreur : Le status de la demande de contact n'a pas pu être modifié.",
      });
    }
    // Renvoie une réponse JSON confirmant la MAJ
    res.json({ msg: "Le status de la demande de contact a bien été modifié." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//SUPPRIMER UNE DEMANDE
const remove = async (req, res) => {
  try {
    // Récupération de l'ID à partir des paramètres de l'URL
    const contactId = req.params.id;

    // Exécute la requête pour supprimer la demande correspondant à l'ID
    const [result] = await Contact.deleteById(contactId);

    // Si aucune demande n'a été supprimée (par ex si l'id n'existe pas)
    if (!result.affectedRows) {
      return res.status(404).json({
        msg: "Erreur : La demande de contact n'a pas pu être supprimée.",
      });
    }

    // Si la demande a bien été supprimée
    res.json({ msg: "La demande de contact a bien été supprimée." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//AJOUTER UNE DEMANDE
const addRequest = async (req, res) => {
  try {
    const { email, objectContact_id, message } = req.body;

    // Validation de tout les champs requis
    if (!email || !objectContact_id || !message) {
      return res.status(400).json({ msg: "Tous les champs sont requis." });
    }
    // Validation simplifiée de l'email
    //vérifie uniquement qu'il y a un '@' et un '.'
    //.+ : Signifie "au moins un caractère" avant et après
    const emailValidate = /.+@.+\..+/;
    if (!emailValidate.test(email)) {
      return res.status(400).json({
        msg: "L'adresse email n'est pas valide.",
      });
    }

    // Vérification des espaces internes dans l'email
    if (email.includes(" ")) {
      return res.status(400).json({
        msg: "L'adresse email ne doit pas contenir d'espaces.",
      });
    }

    // Validation du message : minimum 10 caractères et ne doit pas être uniquement des espaces
    if (message.trim().length < 10) {
      return res.status(400).json({
        msg: "Le message doit contenir au moins 10 caractères.",
      });
    }

    // Ajout de la demande dans la BDD
    await Contact.add(email, objectContact_id, message);

    // Réponse de succès
    res.json({
      msg: "Votre demande a bien été envoyée ! L'agence Myst'Travel reviendra vers vous dans les plus brefs délais.",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//AFFICHER TOUS LES OBJETS DE DEMANDES
const getAllObjects = async (req, res) => {
  try {
    // Récupération de toutes les demandes
    const [objects] = await Contact.findAllObjects();

    // Renvoie les demandes en format JSON
    res.json(objects);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export { getAll, getById, update, remove, addRequest, getAllObjects };
