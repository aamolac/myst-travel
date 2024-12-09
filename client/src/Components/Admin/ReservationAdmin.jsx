import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTrashCan,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Reservation() {
  // État local pour stocker les demandes de réservations récupérées depuis l'API
  const [reservations, setReservations] = useState([]);

  const navigate = useNavigate();
  // Pour gérer les messages de retour
  const [msg, setMsg] = useState("");

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

  // Fonction pour mettre à jour le statut d'une réservation
  const updateStatus = async (id, newStatus) => {
    const response = await fetch(
      `http://localhost:9000/api/v1/reservation/update/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      }
    );

    if (response.ok) {
      // Actualise la liste après la mise à jour
      fetchReservation();
    } else {
      setMsg("Erreur lors de la mise à jour du statut");
    }
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
        window.scrollTo(0, 0);
      } else {
        setMsg("Erreur lors de la suppression de la demande");
      }
    }
  };

  // useEffect pour charger les infos lors du montage du composant
  useEffect(() => {
    fetchReservation();
  }, []);

  return (
    <main className="summary-table container">
      <button onClick={() => navigate("/dashboard")} className="back">
        <FontAwesomeIcon icon={faArrowLeft} /> Retour au tableau de bord
      </button>
      <h2>Demande de réservation de voyages mystères</h2>

      <section>
        {msg && <p className="message">{msg}</p>}
        <table>
          <thead>
            <tr>
              <th>N° réservation</th>
              <th>Identifiant et email utilisateur</th>
              <th>Destination mystère</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reserve) => (
              <tr key={reserve.id}>
                <td>{reserve.id}</td>
                <td>
                  Id : {reserve.user_id} - {reserve.userEmail}
                </td>
                <td>{reserve.mystDestTitle}</td>
                <td>{reserve.createdDate}</td>
                <td>{reserve.reservationStatus}</td>
                <td className="table-button">
                  <select
                    value={reserve.status}
                    onChange={(e) => updateStatus(reserve.id, e.target.value)}
                  >
                    <option value="">Modifier le status</option>
                    <option value={0}>Non traité</option>
                    <option value={1}>En cours de traitement</option>
                    <option value={2}>Traité</option>
                  </select>
                  <div>
                    <button
                      onClick={() => {
                        window.scrollTo(0, 0);
                        navigate(`/dashboard/reservation/${reserve.id}`);
                      }}
                      title={`Aller à la page de la demande de réservation ${reserve.id}`}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      onClick={() => deleteReservation(reserve.id)}
                      title={`Supprimer la demande de réservation ${reserve.id}`}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default Reservation;
