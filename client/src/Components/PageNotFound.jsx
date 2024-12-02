import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBan } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <main id="page-not-found">
      <button
        onClick={() => navigate("/")}
        title="Retour à la page d'accueil"
        className="back"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </button>
      <section>
        <FontAwesomeIcon icon={faBan} />
        <p>La page que vous recherchez n'existe pas.</p>
      </section>
    </main>
  );
}

export default PageNotFound;
