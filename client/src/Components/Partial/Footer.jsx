import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Navigation from "./Navigation.jsx";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0); // Défiler en haut de la page
  };
  return (
    <footer>
      <div className="container">
        <section className="myst-travel">
          <Link to="/" title="Aller à la page d'accueil" onClick={scrollToTop}>
            Myst'Travel
          </Link>
        </section>
        <section className="navigation">
          <h4>Navigation</h4>
          <Navigation isFooter={true} />
        </section>
        <section className="open-hours">
          <h4>Horaires d'ouvertures</h4>
          <p>Mardi au Samedi : 9h - 20h</p>
          <p>Dimanche et lundi : fermé</p>
        </section>
        <section className="social-media">
          <h4>Nous suivre</h4>
          <div>
            <Link
              to="https://www.facebook.com"
              target="_blank"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </Link>
            <Link
              to="https://www.instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link to="https://x.com/" target="_blank" aria-label="Twitter">
              <FontAwesomeIcon icon={faXTwitter} />
            </Link>
          </div>
        </section>
        <section className="legal">
          <p>© 2024 Myst'Travel - Tous droits réservés</p>
          <Link to="/terms-of-use" onClick={scrollToTop}>
            Conditions générales d'utilisation
          </Link>
          <Link to="/privacy-policy" onClick={scrollToTop}>
            Politique de confidentialité
          </Link>{" "}
          <Link to="/legal-information" onClick={scrollToTop}>
            Mentions légales
          </Link>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
