import express from "express";
import { getAll, update, remove } from "../controller/reservation.js";

import adminAuth from "../middleware/withAdminAuth.js";

const router = express.Router();

//ADMIN
//afficher les réservations
router.get("/list", adminAuth, getAll);
//modifier le status d'une réservation
router.patch("/update/:id", adminAuth, update);
//supprimer une réservation
router.delete("/delete/:id", adminAuth, remove);

export default router;
