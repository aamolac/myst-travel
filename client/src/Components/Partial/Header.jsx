import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navigation from "./Navigation.jsx";
import { MenuContext } from "../../store/menu/ContextMenu.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function Header() {
  // Appel au composant isOpen et toggleMenu dans le MenuContext
  const { isOpen, toggleMenu } = useContext(MenuContext);
  //Etat pour la tablette
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768);

  // Met à jour la taille de l'écran lorsque la fenêtre est redimensionnée
  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Gère la classe no-scroll uniquement pour les écrans mobiles
  useEffect(() => {
    if (isOpen && !isTablet) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen, isTablet]);

  // Réinitialise isOpen lorsque la taille de l'écran passe à un mode tablette ou inférieur
  useEffect(() => {
    if (isTablet && isOpen) {
      // Ferme le menu si on passe en mode tablette
      toggleMenu();
    }
  }, [isTablet, isOpen, toggleMenu]);

  return (
    <header>
      <section
        className={`${isTablet ? "tablet-header" : "header-mobile"}`}
        aria-label={isTablet ? "En-tête pour tablette" : "En-tête pour mobile"}
      >
        <div
          className="plane-logo"
          aria-label={
            isTablet
              ? "Logo Myst'Travel avec deux avions"
              : "Logo Myst'Travel avec un avion"
          }
        >
          <img
            src="/src/assets/images/plane-line-straight.webp"
            alt="Dessin d'un avion volant vers la droite avec des pointillés."
          />
          <Link
            to="/"
            title="Aller à la page d'accueil"
            className="myst-travel"
            aria-label="Aller à l'accueil de Myst'Travel"
          >
            Myst'Travel
          </Link>
          {isTablet && (
            <img
              src="/src/assets/images/plane-line-straight-right.webp"
              alt="Dessin d'un avion volant vers la gauche avec des pointillés."
            />
          )}
        </div>
        {!isTablet ? (
          <div
            id="burger-menu"
            className={isOpen ? "open" : ""}
            role="navigation"
            aria-label="Menu de navigation mobile"
          >
            <FontAwesomeIcon
              icon={isOpen ? faXmark : faBars}
              onClick={toggleMenu}
              role="button"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
            />
            {isOpen && <Navigation />}
          </div>
        ) : (
          <Navigation />
        )}
      </section>
    </header>
  );
}

export default Header;
