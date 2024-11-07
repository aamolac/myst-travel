import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useContext } from "react";
import { LoginContext } from "../../store/user/Context.jsx";

function Footer() {
  const { user, isLogged, logout } = useContext(LoginContext);

  const handleLogout = async () => {
    const response = await fetch("http://localhost:9000/api/v1/auth/logout", {
      method: "GET",
      credentials: "include", // inclut les cookies de session
    });

    if (response.ok) {
      logout();
    } else {
      console.error("Logout failed");
    }
  };

  return (
    <footer>
      <section>
        <h1>Myst'Travel</h1>
      </section>
      <section>
        <h2>Navigation</h2>
        <nav>
          <NavLink to={"/"}>Accueil</NavLink>
          <NavLink to={"/about-us"}>Qui sommes-nous ?</NavLink>
          <NavLink to={"/myst-destination"}>Nos destinations mystères</NavLink>

          {isLogged ? (
            <>
              <NavLink to={"/customized-trip"}>
                Nos destinations sur-mesure
              </NavLink>
              <NavLink to={"/contact"}>Contact</NavLink>
              {user?.role === "admin" && (
                <NavLink to={"/dashboard"}>Dashboard</NavLink>
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
      </section>
      <section>
        <h2>Horaires d'ouvertures</h2>
        <p>Mardi au Samedi : 9h - 20h</p>
        <p>Dimanche et lundi : fermé</p>
      </section>
      <section>
        <h2>Nous suivre</h2>
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
      </section>
      <section>
        <Link to="/terms-of-use">Conditions générales d'utilisation</Link> -{" "}
        <Link to="/privacy-policy">Politique de confidentialité</Link>
      </section>
    </footer>
  );
}

export default Footer;
