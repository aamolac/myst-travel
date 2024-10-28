import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../store/user/Context.jsx";

function ProtectedRoute({ children, role }) {
  const { isLogged, user } = useContext(LoginContext);

  // Vérifie si l'utilisateur est connecté et a le rôle requis
  if (!isLogged || (role && user?.role !== role)) {
    return <Navigate to="/" replace />; // Redirige vers la page d'accueil si l'accès est refusé
  }
  return children; // Rendre le composant enfant si l'utilisateur a le rôle requis
}

export default ProtectedRoute;
