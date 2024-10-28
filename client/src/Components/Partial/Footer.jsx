import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      Footer <Link to="/terms-of-use">Conditions générales d'utilisation</Link>{" "}
      - <Link to="/privacy-policy">Politique de confidentialité</Link>
    </footer>
  );
}

export default Footer;
