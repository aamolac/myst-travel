import { fileTypeFromBuffer } from "file-type";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const uploadImage = async (req, res) => {
  try {
    // Vérifie si le fichier est présent
    const file = req.files?.image;
    if (!file) {
      throw new Error("L'image n'a pas pu être récupérée !");
    }

    // Vérifie et créé le répertoire
    const dirPath = path.join(
      process.cwd(),
      "public",
      "img",
      "upload-MystDest"
    );
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Vérifie la taille du fichier (2 Mo max)
    const maxSize = 2 * 1024 * 1024; // 2 Mo
    if (file.size > maxSize) {
      throw new Error(
        "La taille du fichier dépasse la limite autorisée de 2 Mo !"
      );
    }

    // Vérifie des extensions de fichiers
    const validExtensions = [".png", ".jpg", ".jpeg", ".webp"];
    const fileExtension = path.extname(file.name).toLowerCase();
    if (!validExtensions.includes(fileExtension)) {
      throw new Error(
        "Format d'image non pris en charge ! Les extensions autorisées sont : .png, .jpg, .jpeg, .webp."
      );
    }

    // fileTypeFromBuffer: Vérifie le type MIME basé sur le contenu du fichier
    // Récupération des données binaires du fichier
    const buffer = file.data;
    const type = await fileTypeFromBuffer(buffer);
    // Vérifie si le type de fichier est valide en comparant l'extension à la liste autorisée
    if (!type || !validExtensions.includes(`.${type.ext}`)) {
      throw new Error("Une erreur est survenue lors de l'envoi du fichier !");
    }

    // Génére un nom de fichier unique
    const uniqueName = `${uuidv4()}${fileExtension}`;
    const uploadPath = path.join(dirPath, uniqueName);

    // Déplace le fichier vers le répertoire spécifié
    await file.mv(uploadPath);

    // Retourne l'URL relative du fichier enregistré
    return uniqueName;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default uploadImage;
