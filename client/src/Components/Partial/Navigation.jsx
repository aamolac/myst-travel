import { useNavigate, NavLink, Link } from "react-router-dom";

import { useContext } from "react";
import { LoginContext } from "../../store/user/Context.jsx";
import { MenuContext } from "../../store/menu/ContextMenu.jsx";

function Navigation({ isFooter }) {
  // useContext permet d'accéder au contexte User, contient la fonction user, isLogged, logout
  const { user, isLogged, logout } = useContext(LoginContext);
  // Appel au composant isOpen et toggleMenu dans MenuContext
  const { toggleMenu } = useContext(MenuContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
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
        setMsg(
          "Une erreur s'est produite lors de la déconnexion. Veuillez réessayer."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error.message);
      setMsg("Une erreur s'est produite. Veuillez réessayer plus tard.");
    }
  };

  const handleNavClick = () => {
    // Ne ferme le menu que si ce n'est pas dans le footer
    if (!isFooter) toggleMenu();
    window.scrollTo(0, 0);
  };

  return (
    <nav className="container" role="navigation">
      <NavLink
        to={"/"}
        onClick={handleNavClick}
        aria-label="Aller sur la page d'accueil"
      >
        Accueil
      </NavLink>
      <NavLink
        to={"/about-us"}
        onClick={handleNavClick}
        aria-label="Aller sur la page Qui sommes-nous ?"
      >
        Qui sommes-nous ?
      </NavLink>
      <NavLink
        to={"/myst-destination"}
        onClick={handleNavClick}
        aria-label="Aller sur la page Nos destinations mystères"
      >
        Nos destinations mystères
      </NavLink>

      {isLogged ? (
        <>
          <NavLink
            to={"/customized-trip"}
            onClick={handleNavClick}
            aria-label="Aller sur la page Destination sur-mesure"
          >
            Destination sur-mesure
          </NavLink>
          <NavLink
            to={"/contact"}
            onClick={handleNavClick}
            aria-label="Aller sur la page Contact"
          >
            Contact
          </NavLink>
          {user?.role === "admin" && (
            <NavLink
              to={"/dashboard"}
              onClick={handleNavClick}
              aria-label="Aller sur le tableau de bord"
            >
              Tableau de bord
            </NavLink>
          )}
          <Link
            onClick={handleLogout}
            role="button"
            aria-label="Se déconnecter"
          >
            Se déconnecter
          </Link>
        </>
      ) : (
        <>
          <NavLink
            to={"/contact"}
            onClick={handleNavClick}
            aria-label="Aller sur la page Contact"
          >
            Contact
          </NavLink>
          <NavLink
            to={"/auth"}
            onClick={handleNavClick}
            aria-label="Se connecter ou créer un compte"
          >
            Se connecter
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default Navigation;
