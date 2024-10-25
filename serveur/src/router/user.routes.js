import express from "express";
import { getAll, remove } from "../controller/user.js";

import adminAuth from "../middleware/withAdminAuth.js";

const router = express.Router();

//ADMIN
//afficher la liste des utilisateurs
router.get("/list", adminAuth, getAll);
//supprimer un utilisateur
router.delete("/delete/:id", adminAuth, remove);

export default router;
