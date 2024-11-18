import express from "express";
import {
  getAll,
  getById,
  update,
  remove,
  create,
  updateStatus,
} from "../controller/mystDest.js";

import { add } from "../controller/reservation.js";

import adminAuth from "../middleware/withAdminAuth.js";
import withAuth from "../middleware/withAuth.js";

const router = express.Router();

// VISITEUR
//afficher les destinations
router.get("/list", getAll);
//afficher toutes les infos d'une destination par son id
router.get("/:id", getById);

// UTILISATEUR
//faire une réservation
router.post("/:id/reserve", withAuth, add);

//ADMIN
//ajouter une destination
router.post("/add", adminAuth, create);
//modifier une destination
router.patch("/update/:id", adminAuth, update);
//supprimer une destination
router.delete("/delete/:id", adminAuth, remove);
//modifier le status d'une destination
router.patch("/updateStatus/:id", adminAuth, updateStatus);

export default router;
