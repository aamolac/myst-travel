import express from "express";
import { register, login, logout, check_auth } from "../controller/auth.js";

import withAuth from "../middleware/withAuth.js";

const router = express.Router();

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// LOGOUT
router.get("/logout", withAuth, logout);

// Vérifier si l'user est connecté
router.get("/check-auth", withAuth, check_auth);

export default router;
