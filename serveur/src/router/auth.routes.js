import express from "express";
import { register, login, logout, check_auth } from "../controller/auth.js";

import withAuth from "../middleware/withAuth.js";

const router = express.Router();

// REGISTER
//ajouter un utilisateur
router.post("/register", register);

// LOGIN
//gérer la connexion des utilisateurs
router.post("/login", login);

// LOGOUT
router.get("/logout", withAuth, logout);

//vérifier si l'user est connecté
router.get("/check-auth", withAuth, check_auth);

export default router;
