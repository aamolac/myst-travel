import express from "express";
import {
  addRequest,
  getAllObjects,
  getAll,
  getById,
  update,
  remove,
} from "../controller/contact.js";

import adminAuth from "../middleware/withAdminAuth.js";

const router = express.Router();

// VISITEUR
//ajouter une demande de contact
router.post("/add", addRequest);

//afficher les objets de contact
router.get("/object", getAllObjects);

//ADMIN
//afficher les réponses au formulaire de contact
router.get("/list", adminAuth, getAll);
//afficher toutes les infos d'une demande par son id
router.get("/:id", adminAuth, getById);

//modifier le status d'une demande de contact
router.patch("/update/:id", adminAuth, update);

//supprimer une demande de contact
router.delete("/delete/:id", adminAuth, remove);

export default router;
