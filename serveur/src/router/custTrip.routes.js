import express from "express";
import {
  getAll,
  getById,
  update,
  remove,
  addRequest,
  getAllChoices,
} from "../controller/custTrip.js";

import adminAuth from "../middleware/withAdminAuth.js";
import withAuth from "../middleware/withAuth.js";

const router = express.Router();

// UTILISATEUR
//ajouter une demande de voyages sur-mesure
router.post("/add", withAuth, addRequest);
router.get("/choices", withAuth, getAllChoices);

//ADMIN
//afficher les demandes de voyages sur-mesure
router.get("/list", adminAuth, getAll);
//afficher toutes les infos d'une demande par son id
router.get("/:id", adminAuth, getById);

//modifier le status d'une demande
router.patch("/update/:id", adminAuth, update);
//supprimer une demande
router.delete("/delete/:id", adminAuth, remove);

export default router;
