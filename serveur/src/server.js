// configuration des variables d'environnement via dotenv
import "dotenv/config";
// Express, framework pour créer des serveurs web en Node.js
import express from "express";
// path, un module pour manipuler les chemins de fichiers
import path from "path";
// CORS pour gérer les requêtes cross-origin (entre différents domaines)
import cors from "cors";
// express-session pour gérer les sessions utilisateur
// (les sessions permettent de maintenir l'état de connexion entre plusieurs requêtes)
import session from "express-session";
// Importation des routes
import router from "./router/index.routes.js";

import fileUpload from "express-fileupload";

// createRequire pour utiliser le système de modules CommonJS dans un fichier ES Module
import { createRequire } from "module";
// require pour utiliser un module CommonJS (express-mysql-session ici)
const require = createRequire(import.meta.url);
// express-mysql-session' pour stocker les sessions dans MySQL
const MySQLStore = require("express-mysql-session")(session);

const app = express();
const PORT = process.env.LOCAL_PORT;

// CONFIGURATION DE CORS
// autorise à communiquer avec notre serveur uniquement
// Cela empêche les requêtes malveillantes provenant d'autres domaines
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Autorise l'envoi de cookies pour les requêtes cross-origin
  })
);

// CONFIGURATION EXPRESS-SESSION pour la gestion des sessions utilisateur
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }, // Durée de validité du cookie : 1 jour
    // utilisation d'un store pour stocker les sessions dans MySQL, plus optimisé que le store par défaut en mémoire
    store: new MySQLStore({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    }),
  })
);

// DOSSIER STATIQUE POUR LES IMAGES
app.use("/img", express.static(path.join(process.cwd(), "public/img")));

// MIDDLEWARE POUR GÉRER LES FICHIERS UPLOADÉS
app.use(fileUpload());

// MIDDLEWARE pour interpréter les données reçues au format JSON
app.use(express.json());

// FORMULAIRE - Middleware pour gérer les données de formulaire
// converti les données d'un formulaire dans un objet body
app.use(express.urlencoded({ extended: false }));

// MIDDLEWARE POUR LE ROUTER
app.use(router);

// CONFIGURER SESSION PERSONNALISÉE utilisation d'un middleware
// req.session est un objet qu'on va compléter lors de la connexion de l'utilisateur sur la route /login si tout correspond
app.use((req, res, next) => {
  if (req.session && req.session.user) {
    // Si l'utilisateur est connecté, affiche ses informations
    console.log("Utilisateur connecté:", req.session.user);
  } else {
    // Affiche un message lorsque l'utilisateur n'est pas connecté
    console.log("Aucun utilisateur connecté pour l'instant.");
  }
  next(); // Passe à la suite du traitement de la requête
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
