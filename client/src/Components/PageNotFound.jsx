import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

function PageNotFound() {
  return (
    <main id="page-not-found">
      <FontAwesomeIcon icon={faBan} />
      <p>La page que vous recherchez n'existe pas.</p>
    </main>
  );
}

export default PageNotFound;
