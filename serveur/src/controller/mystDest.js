import path from "path";
// Importation des promesses de fs pour les opérations asynchrones
import { promises as fsPromises } from "fs";
import fs from "fs";

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
    // Appel de la méthode pour récupérer la destination avec l'ID fourni
    const [mystDests] = await MystDest.findById(mystDestId);

    // Vérification si la destination a été trouvée
    if (mystDests.length === 0) {
      return res.status(404).json({ msg: "Destination pas trouvée" });
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
    console.log("ID de la destination:", mystDestId);
    // Récupération des informations actuelles de la destination
    const [mystDests] = await MystDest.findById(mystDestId);

    // Vérification si la destination existe
    if (mystDests.length === 0) {
      return res.status(404).json({ msg: "Destination pas trouvée" });
    }

    // Récupérer les informations actuelles de la destination, y compris l'URL de l'image
    const currentImage = mystDests[0].image;
    console.log("URL actuelle de l'image:", currentImage);

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
          console.log("Ancienne image supprimée avec succès");
        } catch (err) {
          console.error(
            "Erreur lors de la suppression de l'ancienne image:",
            err
          );
        }
      }
    }

    // Ajouter l'URL de la nouvelle image dans les champs à mettre à jour si une image a été uploadée
    if (newImage !== currentImage) {
      fieldsToUpdate.image = newImage;
    }

    // Vérifier si des champs ont été fournis pour la mise à jour
    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({ msg: "Pas de champs trouvé à modifier" });
    }

    // Mise à jour de la destination
    const result = await MystDest.update(mystDestId, fieldsToUpdate);

    // Vérification si la mise à jour a réussi
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ msg: "Destination pas modifiée" });
    }

    // Renvoie une réponse JSON confirmant la mise à jour
    res.json({ msg: "Destination modifiée" });
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
    if (!destination) {
      return res.status(404).json({ msg: "Destination pas trouvée" });
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
        console.log("Image supprimée avec succès");
      } catch (err) {
        console.error("Erreur lors de la suppression de l'image", err);
        return res
          .status(500)
          .json({ msg: "Erreur lors de la suppression de l'image" });
      }
    }

    //supprimer la destination de la bdd
    const result = await MystDest.deleteById(mystDestId);
    // Si aucune destination n'a été supprimée (par ex si l'ID n'existe pas)
    if (result[0].affectedRows === 0) {
      return res
        .status(404)
        .json({ msg: "Erreur lors de la suppression de la destination" });
    }

    // Si la destination a bien été supprimée
    res.json({ msg: "Destination et image supprimées" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// AJOUTER UNE DESTINATION
const create = async (req, res) => {
  try {
    const {
      title,
      climate,
      experience,
      activity,
      location,
      budget,
      recoDuration,
      alt,
    } = req.body;

    // Validation de tout les champs requis
    if (
      !title ||
      !climate ||
      !experience ||
      !activity ||
      !location ||
      !budget ||
      !recoDuration ||
      !alt
    ) {
      return res.status(400).json({ msg: "Tous les champs sont requis." });
    }

    // Upload de l'image
    const imageUrl = await uploadImage(req, res);
    if (!imageUrl) {
      return; // Arrête la fonction si une erreur survient lors de l'upload de l'image
    }

    await MystDest.add(
      title,
      climate,
      experience,
      activity,
      location,
      budget,
      recoDuration,
      imageUrl,
      alt
    );
    return res.json({ msg: "Nouvelle destination ajoutée !" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export { getAll, getById, update, remove, create };
