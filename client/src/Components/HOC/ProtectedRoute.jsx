import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, user, role }) {
  if (!user || user.role !== role) {
    return <Navigate to="/" />; // Redirige vers la page d'accueil si non autorisé
  }
  return children;
}

export default ProtectedRoute;
