import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Reservation() {
  // État local pour stocker les demandes de réservations récupérées depuis l'API
  const [reservations, setReservations] = useState([]);

  const navigate = useNavigate();

  //pour récupérer les démandes de réservations
  const fetchReservation = async () => {
    const response = await fetch(
      "http://localhost:9000/api/v1/reservation/list",
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
    setReservations(data);
  };

  // Fonction pour supprimer une demande de réservations
  const deleteReservation = async (id) => {
    const isConfirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer cette réservation?`
    );

    if (isConfirmed) {
      const response = await fetch(
        `http://localhost:9000/api/v1/reservation/delete/${id}`,
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
        // Rechargement de la liste des demandes de réservations
        fetchReservation();
      } else {
        console.error("Erreur lors de la suppression de la demande");
      }
    }
  };

  // useEffect pour charger les infos lors du montage du composant
  useEffect(() => {
    fetchReservation();
  }, []);

  return (
    <main>
      <button
        onClick={() => navigate("/dashboard")}
        title="Retour à la page du dashboard"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </button>
      <h2>Demande de réservation de voyages mystères</h2>
      <table>
        <thead>
          <tr>
            <th>Identifiant de l'utilisateur</th>
            <th>Destination mystère</th>
            <th>Date de départ</th>
            <th>Date d'arrivée</th>
            <th>Nombre d'adultes (plus de 12 ans)</th>
            <th>Nombre d'enfants</th>
            <th>Date de la demande</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reserve) => (
            <tr key={reserve.id}>
              <td>{reserve.user_id}</td>
              <td>{reserve.mystDestination_id}</td>
              <td>{reserve.startDate}h</td>
              <td>{reserve.endDate}h</td>
              <td>{reserve.numberAdult}</td>
              <td>{reserve.numberChild}</td>
              <td>{reserve.createdDate}</td>
              <td>{reserve.status}</td>
              <td>
                <button onClick={() => deleteReservation(reserve.id)}>
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

export default Reservation;
