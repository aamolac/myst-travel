import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navigation from "./Navigation.jsx";
import { MenuContext } from "../../store/menu/Context.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function Header() {
  //  faire appel au composant isOpen et toggleMenu indiqué dans le fichier Context du dossier Menu
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
      toggleMenu(); // Ferme le menu si on passe en mode tablette
    }
  }, [isTablet, isOpen, toggleMenu]);

  return (
    <header>
      <section className={`${isTablet ? "tablet-header" : ""}`}>
        {!isTablet && (
          <>
            <div className="plane-logo header-mobile">
              <img
                src="/src/assets/images/plane-line-straight.webp"
                alt="Dessin d'un avion volant vers la droite avec des pointillés."
              />
              <Link
                to="/"
                title="Aller à la page d'accueil"
                className="myst-travel"
              >
                Myst'Travel
              </Link>
            </div>
            <div id="burger-menu" className={isOpen ? "open" : ""}>
              <FontAwesomeIcon
                icon={isOpen ? faXmark : faBars}
                onClick={toggleMenu}
              />
              {/* Menu qui s'affiche quand 'isOpen' est true */}
              {isOpen && <Navigation />}
            </div>
          </>
        )}
        {isTablet && (
          <>
            <div className="plane-logo">
              <img
                src="/src/assets/images/plane-line-straight.webp"
                alt="Dessin d'un avion volant vers la droite avec des pointillés."
              />
              <Link
                to="/"
                title="Aller à la page d'accueil"
                className="myst-travel"
              >
                Myst'Travel
              </Link>
              <img
                src="/src/assets/images/plane-line-straight-right.webp"
                alt="Dessin d'un avion volant vers la gauche avec des pointillés."
              />
            </div>
            <Navigation />
          </>
        )}
      </section>
    </header>
  );
}

export default Header;
