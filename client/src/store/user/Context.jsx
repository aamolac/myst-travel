import { createContext, useReducer } from "react";
// Importation du reducer qui gère les actions liées à l'utilisateur
import userReducer from "./reducer.js";

// Création du contexte qui va permettre de partager l'état utilisateur à travers les composants
const LoginContext = createContext();
// État initial pour l'utilisateur : non connecté
const INITIAL_STATE = {
  isLogged: false,
  user: null,
};

// Composant Provider qui va envelopper l'application ou les composants enfants
function UserProvider(props) {
  // utilisation du hook useReducer pour gérer l'état de l'utilisateur
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  // Fonction pour gérer la connexion
  function login(user) {
    dispatch({
      type: "LOGIN",
      payload: user,
    });
  }

  // Fonction pour gérer l'enregistrement d'un compte
  function register(datas) {
    dispatch({ type: "REGISTER", payload: datas });
  }

  // Fonction pour gérer la déconnexion
  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  return (
    // Fournit les valeurs à tous les composants
    <LoginContext.Provider
      value={{
        user: state.user,
        isLogged: state.isLogged,
        login,
        logout,
        register,
      }}
    >
      {/* children est un prop qui contient tous les composants enfants de ce composant Provider (ici App) (voir main.jsx)*/}
      {props.children}
    </LoginContext.Provider>
  );
}

export { LoginContext };
export default UserProvider;
