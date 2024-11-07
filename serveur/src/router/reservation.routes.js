import express from "express";
import { getAll, getById, update, remove } from "../controller/reservation.js";

import adminAuth from "../middleware/withAdminAuth.js";

const router = express.Router();

//ADMIN
//afficher les réservations
router.get("/list", adminAuth, getAll);
//afficher toutes les infos d'une réservation par son id
router.get("/:id", adminAuth, getById);
//modifier le status d'une réservation
router.patch("/update/:id", adminAuth, update);
//supprimer une réservation
router.delete("/delete/:id", adminAuth, remove);

export default router;
