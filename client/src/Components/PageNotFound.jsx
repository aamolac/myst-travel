import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBan } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <main
      id="page-not-found"
      className="container"
      aria-label="La page demandée n'existe pas."
    >
      <button
        onClick={() => navigate("/")}
        title="Retour à la page d'accueil"
        className="back"
        area-label="Retour à la page d'accueil"
      >
        <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" /> Retour
      </button>
      <section>
        <FontAwesomeIcon icon={faBan} aria-hidden="true" />
        <p>La page que vous recherchez n'existe pas.</p>
      </section>
    </main>
  );
}

export default PageNotFound;
