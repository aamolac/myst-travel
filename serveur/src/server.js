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
import router from "./router/index.routes.js";

import fileUpload from "express-fileupload";

// module `createRequire` pour permettre l'utilisation de modules CommonJS dans un fichier de type ES Module
import { createRequire } from "module";
// Création de la fonction `require` pour importer des modules CommonJS (ici, on importe `express-mysql-session`)
const require = createRequire(import.meta.url);
// Importation de `express-mysql-session`, un module qui permet de stocker les sessions dans une base de données MySQL
const MySQLStore = require("express-mysql-session")(session);

// Initialisation d'une application Express
const app = express();
// Définition du port sur lequel le serveur écoutera, récupéré depuis les variables d'environnement
const PORT = process.env.LOCAL_PORT;

// CONFIGURATION DE CORS (Cross-Origin Resource Sharing)
// Permet au serveur d'accepter les requêtes venant d'une URL spécifique (par exemple, votre application front-end)
// Cela évite les erreurs de sécurité liées aux requêtes entre domaines
app.use(
  cors({
    origin: "http://localhost:5173",
    // Autorise l'envoi de cookies pour les requêtes cross-origin
    credentials: true,
  })
);

// CONFIGURATION EXPRESS-SESSION pour la gestion des sessions utilisateur
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 },
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
// Configure un dossier où seront stockées les images accessibles publiquement
app.use("/img", express.static(path.join(process.cwd(), "public/img")));

// MIDDLEWARE POUR GÉRER LES FICHIERS UPLOADÉS
// Permet de recevoir des fichiers envoyés par l'utilisateur via des formulaires
app.use(fileUpload());

// MIDDLEWARE POUR LES DONNÉES EN FORMAT JSON
// Permet de traiter les données envoyées au serveur en format JSON
app.use(express.json());

// MIDDLEWARE POUR LES FORMULAIRE
// Permet de traiter les données envoyées via des formulaires HTML classiques
// converti les données d'un formulaire dans un objet body
app.use(express.urlencoded({ extended: false }));

// MIDDLEWARE POUR LE ROUTER
app.use(router);

// LANCEMENT DU SERVEUR
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
