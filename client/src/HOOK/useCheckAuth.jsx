import { useEffect, useContext, useState } from "react";

import { LoginContext } from "../store/user/Context.jsx";

function useCheckAuth() {
  // Récupére les données login et logout du contexte
  const { user: contextUser, login, logout } = useContext(LoginContext);
  // État local pour gérer l'utilisateur connecté
  const [user, setUser] = useState();
  // État pour indiquer si l'état de connexion est en cours de vérification
  const [isChecking, setIsChecking] = useState(true);

  // Synchronise l'état local avec l'utilisateur du contexte
  useEffect(() => {
    // Met à jour l'utilisateur local dès que l'utilisateur du contexte change
    setUser(contextUser);
  }, [contextUser]);

  useEffect(() => {
    // Pour éviter les erreurs si le composant est démonté
    let isMounted = true;

    async function fetchAuth() {
      try {
        const response = await fetch(
          "http://localhost:9000/api/v1/auth/check-auth",
          {
            // Envoi des cookies pour vérifier l'état de connexion sur le serveur
            credentials: "include", // s'assurer que les cookies de session sont inclus
          }
        );

        if (response.ok) {
          const data = await response.json();
          // si la réponse est ok, on récupère les données de l'utilisateur envoyé en JSON
          // qu'on parse et on les stocke dans le state setUser, qui est un state d'un context User
          if (isMounted) {
            if (data.isLogged) {
              console.log("Utilisateur connecté :", data.user);
              login(data.user);
              setUser(data.user);
            } else {
              logout();
              // Définit comme non connecté
              setUser(null);
            }
          }
        } else {
          if (isMounted) {
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
          // La vérification est terminée
          setIsChecking(false);
        }
      }
    }

    // Ne pas réexécuter la vérification si elle a déjà été effectuée
    if (isChecking) {
      fetchAuth();
    }

    return () => {
      // Nettoyage pour éviter les fuites de mémoire
      isMounted = false;
    };
  }, [isChecking, login, logout]);

  return user;
}

export default useCheckAuth;
