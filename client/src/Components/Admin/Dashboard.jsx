import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  return (
    <main id="dashboard">
      <h2>
        <FontAwesomeIcon icon={faGear} /> Tableau de bord{" "}
        <FontAwesomeIcon icon={faGear} />
      </h2>
      <section>
        <Link to="/dashboard/user">Utilisateur</Link>
        <Link to="/dashboard/myst-destination">Destination mystère</Link>
        <Link to="/dashboard/customized-trip">Destination sur-mesure</Link>
        <Link to="/dashboard/reservation">Réservation</Link>
        <Link to="/dashboard/contact">Demande de contact</Link>
      </section>
    </main>
  );
}

export default Dashboard;
