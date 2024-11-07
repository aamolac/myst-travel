import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CustTrip() {
  // État local pour stocker les demandes de voyages sur-mesure récupérées depuis l'API
  const [custTrips, setCustTrips] = useState([]);
  const navigate = useNavigate();
  // Pour gérer les messages de retour
  const [msg, setMsg] = useState("");

  // Fonction de mappage pour convertir le statut en valeur numérique
  const getStatusValue = (statusLabel) => {
    switch (statusLabel) {
      case "Non traité":
        return 0;
      case "En cours de traitement":
        return 1;
      case "Traité":
        return 2;
      default:
        return 0;
    }
  };

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
  const updateStatus = async (id, newStatusLabel) => {
    // Convertit le label en entier
    const newStatus = getStatusValue(newStatusLabel);

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
    <main>
      <button
        onClick={() => navigate("/dashboard")}
        title="Retour à la page du dashboard"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </button>
      <h2>Demande de voyage sur-mesure</h2>

      {msg && <p>{msg}</p>}
      <table>
        <thead>
          <tr>
            <th>Numéro de la demande</th>
            <th>Identifiant de l'utilisateur</th>
            <th>Email de l'utilisateur</th>
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
              <td>
                <button
                  onClick={() => {
                    navigate(`/dashboard/customized-trip/${trip.id}`);
                  }}
                  title={`Aller à la page de la demande de destination sur-mesure ${trip.id}`}
                >
                  Voir
                </button>
                {getStatusValue(trip.status) === 0 && (
                  <button
                    onClick={() =>
                      updateStatus(trip.id, "En cours de traitement")
                    }
                  >
                    En cours de traitement
                  </button>
                )}
                {getStatusValue(trip.status) === 1 && (
                  <button onClick={() => updateStatus(trip.id, "Traité")}>
                    Traité
                  </button>
                )}
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
