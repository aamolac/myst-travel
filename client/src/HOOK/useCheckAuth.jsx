import { useEffect, useContext, useState } from "react";

import { LoginContext } from "../store/user/Context.jsx";

function useCheckAuth() {
  // récupérer les fonctions login et logout du contexte
  const { login, logout } = useContext(LoginContext);
  // État local pour garder la première valeur utilisateur
  const [user, setUser] = useState(undefined); // `undefined` indique que la vérification est en cours
  const [isChecking, setIsChecking] = useState(true); // Ajout d'un état pour éviter les boucles infinies

  useEffect(() => {
    let isMounted = true; // Pour éviter les erreurs si le composant est démonté

    async function fetchAuth() {
      try {
        const response = await fetch(
          "http://localhost:9000/api/v1/auth/check-auth",
          {
            // dans la requête on envoie les cookies pour que le serveur puisse s'en servir afin de vérifier l'état de connexion
            credentials: "include", // s'assurer que les cookies de session sont inclus
          }
        );

        // si la réponse est ok, on récupère les données de l'utilisateur envoyé en JSON qu'on parse et on les stocke dans le state setUser, qui est un state d'un context User
        if (isMounted) {
          if (response.ok) {
            const data = await response.json();
            if (data.isLogged) {
              console.log("Utilisateur connecté :", data.user);
              login(data.user); // Met à jour le contexte
              setUser(data.user); // Met à jour le state local
            } else {
              logout(); // Déconnecte dans le contexte
              setUser(null); // Définit comme non connecté
            }
          } else {
            // Gestion d'une réponse non OK (par ex., 401)
            logout();
            setUser(null);
          }
        }
      } catch (error) {
        console.log(
          `Erreur lors de la récupération de l'authentification: ${error.message}`
        );
        if (isMounted) {
          logout();
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsChecking(false); // La vérification est terminée
        }
      }
    }

    // Ne pas réexécuter la vérification si elle a déjà été effectuée
    if (isChecking) {
      fetchAuth();
    }

    return () => {
      isMounted = false; // Nettoyage pour éviter les fuites de mémoire
    };
  }, [isChecking, login, logout]);

  // Retourne `undefined` tant que l'authentification est en cours
  return isChecking ? undefined : user;
}

export default useCheckAuth;
