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
    window.scrollTo(0, 0);
  };
  return (
    <footer>
      <div className="container">
        <section className="myst-travel">
          <Link
            to="/"
            title="Aller à la page d'accueil"
            onClick={scrollToTop}
            aria-label="Aller à la page d'accueil"
          >
            Myst'Travel
          </Link>
        </section>
        <section className="navigation" role="navigation">
          <h4>Navigation</h4>
          <Navigation isFooter={true} />
        </section>
        <section className="open-hours">
          <h4>Horaires d'ouvertures</h4>
          <p>Mardi au Samedi : 9h - 20h</p>
          <p>Dimanche et lundi : fermé</p>
        </section>
        <section className="social-media" aria-label="Nos réseaux sociaux">
          <h4>Nous suivre</h4>
          <div>
            <Link
              to="https://www.facebook.com"
              target="_blank"
              aria-label="Suivez-nous sur Facebook"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </Link>
            <Link
              to="https://www.instagram.com"
              target="_blank"
              aria-label="Suivez-nous sur Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link
              to="https://x.com/"
              target="_blank"
              aria-label="Suivez-nous sur Twitter"
            >
              <FontAwesomeIcon icon={faXTwitter} />
            </Link>
          </div>
        </section>
        <section className="legal">
          <p>© 2024 Myst'Travel - Tous droits réservés</p>
          <Link
            to="/terms-of-use"
            onClick={scrollToTop}
            aria-label="Voir les conditions générales d'utilisation"
          >
            Conditions générales d'utilisation
          </Link>
          <Link
            to="/privacy-policy"
            onClick={scrollToTop}
            aria-label="Voir la politique de confidentialité"
          >
            Politique de confidentialité
          </Link>{" "}
          <Link
            to="/legal-information"
            onClick={scrollToTop}
            aria-label="Voir les mentions légales"
          >
            Mentions légales
          </Link>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
