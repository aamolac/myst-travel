import { useEffect, useContext, useState } from "react";

import { LoginContext } from "../store/user/Context.jsx";

function useCheckAuth() {
  // récupérer les fonctions login et logout du contexte
  const { login, logout, isLogged } = useContext(LoginContext);
  const [user, setUser] = useState(undefined); // État local pour garder la première valeur utilisateur

  useEffect(() => {
    async function fetchAuth() {
      try {
        const response = await fetch(
          "http://localhost:9000/api/v1/auth/check-auth",
          {
            // dans la requête on envoie les cookies pour que le serveur puisse s'en servir afin de vérifier l'état de connexion
            credentials: "include", // s'assurer que les cookies de session sont inclus
          }
        );
        // on envoi un 401 depuis le serveur en JSON si c'est le cas "utilisateur non connecté on stoppe la fonction avec un return"
        if (response.status === 401) {
          console.log("utilisateur non connecté sur le serveur");
          logout();
          setUser(null); // définir explicitement comme non connecté
          return;
        }
        // si la réponse est ok, on récupère les données de l'utilisateur envoyé en JSON qu'on parse et on les stocke dans le state setUser, qui est un state d'un context User
        if (response.ok) {
          const data = await response.json();
          // Si l'utilisateur est connecté, mettre à jour l'état dans le contexte
          if (data.isLogged) {
            login(data.user); // Mettre à jour le contexte avec l'email
            setUser(data.user); // Mettre à jour avec l'utilisateur connecté
          } else {
            logout(); // Si pas connecté, réinitialiser l'état
            setUser(null); // Mettre à jour en cas de déconnexion
          }
        }
      } catch (error) {
        console.log(
          `Erreur lors de la récupération de l'authentification: ${error.message}`
        );
        logout();
        setUser(null); // En cas d'erreur, déconnecter par défaut
      }
    }
    // simuler une latence de 2 secondes pour voir le chargement en localhost
    // setTimeout(() => {

    if (user === undefined) {
      fetchAuth();
    }
    // }, 2000);
  }, [isLogged, login, logout, user]);
  return user;
}

export default useCheckAuth;
