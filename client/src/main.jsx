// Importation de BrowserRouter pour gérer la navigation dans l'application avec React Router
import { BrowserRouter } from "react-router-dom";
// Importation de createRoot depuis react-dom/client pour créer la racine de l'application React
import { createRoot } from "react-dom/client";
// Importation du Provider pour le contexte utilisateur, qui va envelopper l'application et fournir les données utilisateur
import UserProvider from "./store/user/Context.jsx";
import MenuProvider from "./store/menu/Context.jsx";

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
