import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CustTrip() {
  // État local pour stocker les demandes de voyages sur-mesure récupérées depuis l'API
  const [custTrips, setCustTrips] = useState([]);

  const navigate = useNavigate();

  //pour récupérer les démandes de voyages sur-mesure
  const fetchCustTrip = async () => {
    const response = await fetch(
      "http://localhost:9000/api/v1/customized-trip/list",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    //convertit la réponse en json
    const data = await response.json();
    //mise à jour de l'état avec les demandes récupérées
    setCustTrips(data);
  };

  // Fonction pour supprimer une demande de voyages sur-mesure
  const deleteCustTrip = async (id) => {
    const isConfirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette demande de voyage sur-mesure ?"
    );

    if (isConfirmed) {
      const response = await fetch(
        `http://localhost:9000/api/v1/customized-trip/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      // Vérifie si la suppression a été effectuée avec succès
      if (response.ok) {
        // Rechargement de la liste des demandes de voyages sur-mesure
        fetchCustTrip();
      } else {
        console.error("Erreur lors de la suppression de la demande");
      }
    }
  };

  // useEffect pour charger les infos lors du montage du composant
  useEffect(() => {
    fetchCustTrip();
  }, []);

  return (
    <main>
      <button
        onClick={() => navigate("/dashboard")}
        title="Retour à la page du dashboard"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </button>
      <h2>Demande de voyage sur-mesure</h2>
      <table>
        <thead>
          <tr>
            <th>Identifiant de l'utilisateur</th>
            <th>Type d'expérience</th>
            <th>Durée (jours)</th>
            <th>Budget (€/par personne)</th>
            <th>Climat</th>
            <th>Hébergement</th>
            <th>Activité</th>
            <th>Destination</th>
            <th>Nombre d'adultes (plus de 12 ans)</th>
            <th>Nombre d'enfants</th>
            <th>Culture locale</th>
            <th>Restriction</th>
            <th>Date de la demande</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {custTrips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.user_id}</td>
              <td>{trip.typeExperienceChoice.split(" (")[0]}</td>
              <td>{trip.duration}</td>
              <td>{trip.budget}</td>
              <td>{trip.climateChoice}</td>
              <td>{trip.accomodationChoice.split(" (")[0]}</td>
              <td>{trip.activityChoice.split(" (")[0]}</td>
              <td>{trip.locationChoice}</td>
              <td>{trip.numberAdult}</td>
              <td>{trip.numberChild}</td>
              <td>{trip.cultureChoice.split(" (")[0]}</td>
              <td>{trip.restriction}</td>
              <td>{trip.createdDate}</td>
              <td>{trip.status}</td>
              <td>
                <button onClick={() => deleteCustTrip(trip.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default CustTrip;
