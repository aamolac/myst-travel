import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <main id="dashboard" aria-label="Page du tableau de bord">
      <h2>
        <FontAwesomeIcon icon={faGear} aria-hidden="true" /> Tableau de bord{" "}
        <FontAwesomeIcon icon={faGear} aria-hidden="true" />
      </h2>
      <section className="container">
        <Link to="/dashboard/user" onClick={scrollToTop}>
          Utilisateur
        </Link>
        <Link to="/dashboard/myst-destination" onClick={scrollToTop}>
          Destination mystère
        </Link>
        <Link to="/dashboard/customized-trip" onClick={scrollToTop}>
          Destination sur-mesure
        </Link>
        <Link to="/dashboard/reservation" onClick={scrollToTop}>
          Réservation
        </Link>
        <Link to="/dashboard/contact" onClick={scrollToTop}>
          Demande de contact
        </Link>
      </section>
    </main>
  );
}

export default Dashboard;
