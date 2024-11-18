import { useNavigate, NavLink, Link } from "react-router-dom";

import { useContext } from "react";
import { LoginContext } from "../../store/user/Context.jsx";

function Navigation() {
  // pour récupérer les données de l'utilisateur on utilise le hook useContext
  // en lui passant le contexte à utiliser ici il correspond au contexte de l'utilisateur
  const { user, isLogged, logout } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetch("http://localhost:9000/api/v1/auth/logout", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      // Mettre à jour le contexte global pour signifier que l'utilisateur est déconnecté
      logout();
      navigate("/");
    } else {
      console.error("Logout failed");
    }
  };

  return (
    <nav>
      <NavLink to={"/"}>Accueil</NavLink>
      <NavLink to={"/about-us"}>Qui sommes-nous ?</NavLink>
      <NavLink to={"/myst-destination"}>Nos destinations mystères</NavLink>

      {isLogged ? (
        <>
          <NavLink to={"/customized-trip"}>Destination sur-mesure</NavLink>
          <NavLink to={"/contact"}>Contact</NavLink>
          {user?.role === "admin" && (
            <NavLink to={"/dashboard"}>Tableau de bord</NavLink>
          )}
          <Link onClick={handleLogout}>Se déconnecter</Link>
        </>
      ) : (
        <>
          <NavLink to={"/contact"}>Contact</NavLink>
          <NavLink to={"/auth"}>Se connecter</NavLink>
        </>
      )}
    </nav>
  );
}

export default Navigation;
