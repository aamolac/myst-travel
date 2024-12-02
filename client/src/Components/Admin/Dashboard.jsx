import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const scrollToTop = () => {
    window.scrollTo(0, 0); // Défiler en haut de la page
  };
  return (
    <main id="dashboard">
      <h2>
        <FontAwesomeIcon icon={faGear} /> Tableau de bord{" "}
        <FontAwesomeIcon icon={faGear} />
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
