import { useNavigate, NavLink, Link } from "react-router-dom";

import { useContext } from "react";
import { LoginContext } from "../../store/user/Context.jsx";
import { MenuContext } from "../../store/menu/Context.jsx";

function Navigation({ isFooter }) {
  // pour récupérer les données de l'utilisateur on utilise le hook useContext
  // en lui passant le contexte à utiliser ici il correspond au contexte de l'utilisateur
  const { user, isLogged, logout } = useContext(LoginContext);
  //  faire appel au composant isOpen et toggleMenu indiqué dans le fichier Context du dossier Menu
  const { toggleMenu } = useContext(MenuContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetch("http://localhost:9000/api/v1/auth/logout", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      // Mettre à jour le contexte global pour signifier que l'utilisateur est déconnecté
      logout();
      if (!isFooter) toggleMenu(); // Ferme le menu si ce n'est pas dans le footer
      navigate("/");
    } else {
      console.error("Logout failed");
    }
  };

  const handleNavClick = () => {
    if (!isFooter) toggleMenu(); // Ne ferme le menu que si ce n'est pas dans le footer
    window.scrollTo(0, 0); // Défiler en haut de la page
  };

  return (
    <nav className="container">
      <NavLink to={"/"} onClick={handleNavClick}>
        Accueil
      </NavLink>
      <NavLink to={"/about-us"} onClick={handleNavClick}>
        Qui sommes-nous ?
      </NavLink>
      <NavLink to={"/myst-destination"} onClick={handleNavClick}>
        Nos destinations mystères
      </NavLink>

      {isLogged ? (
        <>
          <NavLink to={"/customized-trip"} onClick={handleNavClick}>
            Destination sur-mesure
          </NavLink>
          <NavLink to={"/contact"} onClick={handleNavClick}>
            Contact
          </NavLink>
          {user?.role === "admin" && (
            <NavLink to={"/dashboard"} onClick={handleNavClick}>
              Tableau de bord
            </NavLink>
          )}
          <Link onClick={handleLogout}>Se déconnecter</Link>
        </>
      ) : (
        <>
          <NavLink to={"/contact"} onClick={handleNavClick}>
            Contact
          </NavLink>
          <NavLink to={"/auth"} onClick={handleNavClick}>
            Se connecter
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default Navigation;
