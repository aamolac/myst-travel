import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import Navigation from "./Navigation.jsx";
import { MenuContext } from "../../store/menu/Context.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function Header() {
  //  faire appel au composant isOpen et toggleMenu indiqué dans le fichier Context du dossier Menu
  const { isOpen, toggleMenu } = useContext(MenuContext);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

  return (
    <header>
      <section className="container">
        <Link to="/" title="Aller à la page d'accueil" className="myst-travel">
          Myst'Travel
        </Link>
        <div id="burger-menu" className={isOpen ? "open" : ""}>
          <FontAwesomeIcon
            icon={isOpen ? faXmark : faBars}
            onClick={toggleMenu}
          />
          {/* Menu qui s'affiche quand 'isOpen' est true */}
          {isOpen && <Navigation />}
        </div>
      </section>
    </header>
  );
}

export default Header;
