import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../store/user/Context.jsx";

function ProtectedRoute({ children, roles }) {
  const { isLogged, user } = useContext(LoginContext);

  // Vérifie si l'utilisateur est connecté et a le rôle demandé
  if (!isLogged || (roles && !roles.includes(user?.role))) {
    // Redirige vers la page de connexion si l'accès est refusé
    return <Navigate to="/auth" replace />;
  }
  // Rendre le composant enfant si l'utilisateur a le rôle requis
  return children;
}

export default ProtectedRoute;
