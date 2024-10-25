import express from "express";
import {
  getAll,
  update,
  remove,
  addRequest,
  getAllObjects,
} from "../controller/contact.js";

import adminAuth from "../middleware/withAdminAuth.js";

const router = express.Router();

//ADMIN
//afficher les réponses au formulaire de contact
router.get("/list", adminAuth, getAll);

//modifier le status d'une demande de contact
router.patch("/update/:id", adminAuth, update);

//supprimer une demande de contact
router.delete("/delete/:id", adminAuth, remove);

// VISITEUR
//ajouter une demande de contact
router.post("/add", addRequest);

//ajouter une demande de contact
router.get("/objects", getAllObjects);

export default router;
