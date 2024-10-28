import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <main>
      <Link to="/dashboard/user">Utilisateur</Link>
      <Link to="/">Destination mystère</Link>
      <Link to="/dashboard/customized-trip">Destination sur-mesure</Link>
      <Link to="/dashboard/reservation">Réservation</Link>
      <Link to="/dashboard/contact">Demande de contact</Link>
    </main>
  );
}

export default Dashboard;
