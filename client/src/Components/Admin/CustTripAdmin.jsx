import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTrashCan,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CustTrip() {
  // État local pour stocker les demandes de voyages sur-mesure récupérées depuis l'API
  const [custTrips, setCustTrips] = useState([]);
  const navigate = useNavigate();
  // Pour gérer les messages de retour
  const [msg, setMsg] = useState("");

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

  // Fonction pour mettre à jour le statut d'une demande
  const updateStatus = async (id, newStatus) => {
    const response = await fetch(
      `http://localhost:9000/api/v1/customized-trip/update/${id}`,
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
      fetchCustTrip();
    } else {
      setMsg("Erreur lors de la mise à jour du statut");
    }
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
        window.scrollTo(0, 0);
      } else {
        setMsg("Erreur lors de la suppression de la demande");
      }
    }
  };

  // useEffect pour charger les infos lors du montage du composant
  useEffect(() => {
    fetchCustTrip();
  }, []);

  return (
    <main className="summary-table container">
      <button onClick={() => navigate("/dashboard")} className="back">
        <FontAwesomeIcon icon={faArrowLeft} /> Retour au tableau de bord
      </button>
      <h2>Demande de voyage sur-mesure</h2>

      <section>
        {msg && <p className="message">{msg}</p>}
        <table>
          <thead>
            <tr>
              <th>N° demande</th>
              <th>Identifiant utilisateur</th>
              <th>Email utilisateur</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {custTrips.map((trip) => (
              <tr key={trip.id}>
                <td>{trip.id}</td>
                <td>{trip.user_id}</td>
                <td>{trip.userEmail}</td>
                <td>{trip.createdDate}</td>
                <td>{trip.status}</td>
                <td className="table-button">
                  <select
                    value={trip.status}
                    onChange={(e) => updateStatus(trip.id, e.target.value)}
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
                        navigate(`/dashboard/customized-trip/${trip.id}`);
                      }}
                      title={`Aller à la page de la demande de destination sur-mesure ${trip.id}`}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      onClick={() => deleteCustTrip(trip.id)}
                      title={`Supprimer la demande de destination sur-mesure ${trip.id}`}
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

export default CustTrip;
