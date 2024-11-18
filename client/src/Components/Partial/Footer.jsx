import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Navigation from "./Navigation.jsx";

function Footer() {
  return (
    <footer>
      <section>
        <h1>Myst'Travel</h1>
      </section>
      <section>
        <h4>Navigation</h4>
        <Navigation />
      </section>
      <section>
        <h4>Horaires d'ouvertures</h4>
        <p>Mardi au Samedi : 9h - 20h</p>
        <p>Dimanche et lundi : fermé</p>
      </section>
      <section>
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
      <section>
        <p>© 2024 - Myst'Travel</p>
        <Link to="/terms-of-use">Conditions générales d'utilisation</Link>
        <Link to="/privacy-policy">Politique de confidentialité</Link>{" "}
        <Link>Mentions légales</Link>
      </section>
    </footer>
  );
}

export default Footer;
