import { createContext, useReducer } from "react";
// Importation du reducer qui gère les actions liées à l'utilisateur
import userReducer from "./reducer.js";

// Création du contexte qui va permettre de partager l'état utilisateur à travers les composants
const LoginContext = createContext();
// État initial pour l'utilisateur : non connecté (isLogged: false) et sans email (email: "")
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

// Export du contexte pour que les composants puissent l'utiliser via useContext
export { LoginContext };

// Export par défaut du composant Provider pour qu'il puisse envelopper l'application
export default UserProvider;
