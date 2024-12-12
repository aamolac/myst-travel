// Pour gérer la navigation dans l'application avec React Router
import { BrowserRouter } from "react-router-dom";
// Pour créer la racine de l'application React
import { createRoot } from "react-dom/client";
// Import du Provider pour le contexte utilisateur, enveloppe l'application et fournit les données utilisateur
import UserProvider from "./store/user/Context.jsx";
import MenuProvider from "./store/menu/ContextMenu.jsx";

import App from "./App.jsx";
import "./assets/css/style.css";

createRoot(document.getElementById("root")).render(
  <MenuProvider>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </MenuProvider>
);
