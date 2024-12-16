import path from "path";
// Importation des promesses de fs pour les opérations asynchrones
import { promises as fsPromises } from "fs";

import MystDest from "../model/MystDest.js";
import uploadImage from "../middleware/fileUpload.js";

//AFFICHER TOUTES LES DESTINATIONS
const getAll = async (req, res) => {
  try {
    // Récupération de toutes les destinations
    const [mystDests] = await MystDest.findAll();

    // Renvoie les demandes en format JSON
    res.json(mystDests);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//AFFICHER TOUTES LES INFOS D'UNE DESTINATION AVEC SON ID
const getById = async (req, res) => {
  try {
    // Récupération de l'ID à partir des paramètres de l'URL
    const mystDestId = req.params.id;

    // Exécute la requête pour récupérer la destination correspondant à l'ID
    const [mystDests] = await MystDest.findById(mystDestId);

    // Vérification si la destination a été trouvée
    if (!mystDests.length) {
      return res
        .status(404)
        .json({ msg: "Erreur : La destination demandée n'existe pas." });
    }

    // Renvoie les infos de la destination en format JSON
    res.json(mystDests[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//MODIFIER UNE DESTINATION
const update = async (req, res) => {
  try {
    // Récupération de l'ID à partir des paramètres de l'URL
    const mystDestId = req.params.id;

    // Récupération des informations actuelles de la destination
    const [mystDests] = await MystDest.findById(mystDestId);

    // Vérification si la destination existe
    if (!mystDests.length) {
      return res
        .status(404)
        .json({ msg: "Erreur : La destination demandée n'existe pas." });
    }

    // Récupérer les informations actuelles de la destination, y compris l'URL de l'image
    const currentImage = mystDests[0].image;

    // Récupération de la nouvelle information à partir du corps de la requête
    const fieldsToUpdate = req.body;

    // si le champ image est présent, on ne vérifie pas les autres champs
    let newImage = currentImage;

    // Vérification s'il y a une nouvelle image à uploader
    if (req.files?.image) {
      // Upload de la nouvelle image
      newImage = await uploadImage(req, res);

      // Supprimer l'ancienne image si elle existe et qu'elle n'est pas l'image par défaut
      if (currentImage && currentImage !== "default-image.jpg") {
        const oldImagePath = path.join(
          process.cwd(),
          "public",
          "img",
          "upload-MystDest",
          currentImage
        );

        try {
          // Suppression asynchrone de l'ancienne image
          await fsPromises.unlink(oldImagePath);
          // console.log("Ancienne image supprimée avec succès");
        } catch (err) {
          console.error(
            "Erreur lors de la suppression de l'ancienne image:",
            err
          );
        }
      }
    }

    // Ajouter l'URL de la nouvelle image dans les champs à MAJ si une image a été uploadée
    if (newImage !== currentImage) {
      fieldsToUpdate.image = newImage;
    }

    // Vérifier si des champs ont été fournis pour la MAJ
    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({ msg: "Pas de champs trouvé à modifier" });
    }

    // Conversion des champs en nombres
    fieldsToUpdate.budget = parseFloat(fieldsToUpdate.budget);
    fieldsToUpdate.maxDuration = Number(fieldsToUpdate.maxDuration);
    fieldsToUpdate.minDuration = Number(fieldsToUpdate.minDuration);

    // Vérification des champs numériques
    if (
      isNaN(fieldsToUpdate.budget) ||
      isNaN(fieldsToUpdate.maxDuration) ||
      isNaN(fieldsToUpdate.minDuration)
    ) {
      return res.status(400).json({
        msg: "Veuillez entrer des chiffres valides pour les champs requis.",
      });
    }

    // Vérification des valeurs de minDuration et maxDuration
    if (
      (fieldsToUpdate.minDuration &&
        (fieldsToUpdate.minDuration < 2 || fieldsToUpdate.minDuration > 21)) ||
      (fieldsToUpdate.maxDuration &&
        (fieldsToUpdate.maxDuration < 2 || fieldsToUpdate.maxDuration > 21))
    ) {
      return res.status(400).json({
        msg: "Les durées doivent être comprises entre 2 et 21 jours.",
      });
    }

    // Vérification de la durée maximale
    if (fieldsToUpdate.maxDuration <= fieldsToUpdate.minDuration) {
      return res.status(400).json({
        msg: "La durée maximale doit être supérieure à la durée minimale.",
      });
    }

    // Exécute la requête pour MAJ le status de la destination
    const [result] = await MystDest.update(mystDestId, fieldsToUpdate);

    // Vérification si la MAJ a réussi
    if (!result.affectedRows) {
      return res.status(404).json({
        msg: "Erreur : La destination mystère n'a pas pu être modifiée.",
      });
    }

    // Renvoie une réponse JSON confirmant la MAJ
    res.json({ msg: "La destination a bien été modifiée." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// SUPPRIMER UNE DESTINATION
const remove = async (req, res) => {
  try {
    // Récupération de l'ID à partir des paramètres de l'URL
    const mystDestId = req.params.id;

    // Récupérer les informations de la destination (y compris le chemin de l'image)
    const destination = await MystDest.findById(mystDestId);

    // Si la destination n'existe pas
    if (!destination.length) {
      return res
        .status(404)
        .json({ msg: "Erreur : La destination demandée n'existe pas." });
    }

    const image = destination[0][0].image;

    const imagePath = path.join(
      process.cwd(),
      "public",
      "img",
      "upload-MystDest",
      image
    );

    // Si une image est associée et que ce n'est pas une image par défaut, on la supprime
    if (image && image !== "default-image.jpg") {
      try {
        // Supprimer l'image du dossier
        await fsPromises.unlink(imagePath);
        // console.log("Image supprimée avec succès !");
      } catch (err) {
        console.error("Erreur lors de la suppression de l'image.", err);
        return res
          .status(500)
          .json({ msg: "Erreur lors de la suppression de l'image." });
      }
    }

    // Exécute la requête pour supprimer la destination correspondant à l'ID
    const [result] = await MystDest.deleteById(mystDestId);

    // Si aucune destination n'a été supprimée (par ex si l'ID n'existe pas)
    if (!result.affectedRows) {
      return res.status(404).json({
        msg: "Erreur : La destination mystère n'a pas pu être supprimée.",
      });
    }

    // Si la destination a bien été supprimée
    res.json({ msg: "La destination a bien été supprimée." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// AJOUTER UNE DESTINATION
const create = async (req, res) => {
  try {
    const {
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
      alt,
    } = req.body;

    // Validation de tout les champs requis
    if (
      !title ||
      !climateClue ||
      !climate ||
      !experienceClue ||
      !accomodation ||
      !activityClue ||
      !activity ||
      !locationClue ||
      !continent ||
      !budget ||
      !minDuration ||
      !maxDuration ||
      !alt
    ) {
      return res.status(400).json({ msg: "Tous les champs sont requis." });
    }

    // Conversion des champs en nombres
    const budgetNum = parseFloat(budget);
    const minDurationNum = Number(minDuration);
    const maxDurationNum = Number(maxDuration);

    // Vérification des champs numériques
    if (isNaN(budgetNum) || isNaN(minDurationNum) || isNaN(maxDurationNum)) {
      return res.status(400).json({
        msg: "Veuillez entrer des chiffres valides pour les champs requis.",
      });
    }

    // Vérification des valeurs de minDuration et maxDuration
    if (
      minDurationNum < 2 ||
      minDurationNum > 21 ||
      maxDurationNum < 2 ||
      maxDurationNum > 21
    ) {
      return res.status(400).json({
        msg: "Les durées doivent être comprises entre 2 et 21 jours.",
      });
    }

    // Vérification de la durée maximale
    if (maxDurationNum <= minDurationNum) {
      return res.status(400).json({
        msg: "La durée maximale doit être supérieure à la durée minimale.",
      });
    }

    // Upload de l'image
    const imageUrl = await uploadImage(req, res);
    if (!imageUrl) {
      // Arrête la fonction si une erreur survient lors de l'upload de l'image
      return;
    }

    // Ajout de la destination dans la BDD
    await MystDest.add(
      title,
      climateClue,
      climate,
      experienceClue,
      accomodation,
      activityClue,
      activity,
      locationClue,
      continent,
      budgetNum,
      minDurationNum,
      maxDurationNum,
      imageUrl,
      alt
    );

    // Réponse de succès
    res.json({ msg: "Nouvelle destination ajoutée !" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// MODIFIER LE STATUS D'UNE DESTINATION
const updateStatus = async (req, res) => {
  try {
    // Récupération de l'ID à partir des paramètres de l'URL
    const mystDestStatusId = req.params.id;

    // Récupération du nouveau statut à partir du corps de la requête
    const { status } = req.body;

    // Exécute la requête pour MAJ le status de la destination
    const [result] = await MystDest.updateStat(mystDestStatusId, status);

    // Vérification si la MAJ a réussi
    if (!result.affectedRows) {
      return res.status(404).json({
        msg: "Erreur : Le status de la destination n'a pas pu être modifié.",
      });
    }

    // Renvoie une réponse JSON confirmant la MAJ
    res.json({ msg: "Le status de la destination a bien été modifié." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export { getAll, getById, update, remove, create, updateStatus };
