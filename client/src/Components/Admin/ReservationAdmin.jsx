import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTrashCan,
  faEye,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Reservation() {
  // État local pour stocker les demandes de réservations récupérées depuis l'API
  const [reservations, setReservations] = useState([]);
  // État pour la barre de recherche
  const [searchBar, setSearchBar] = useState("");
  // État pour le champ sélectionné
  const [searchField, setSearchField] = useState("all");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  //Fonction pour récupérer les demandes de réservations
  const fetchReservation = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/v1/reservation/list",
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      setMsg("Erreur lors du chargement des demandes de réservation");
    }
  };

  // Fonction pour maj le statut
  const updateStatus = async (id, newStatus) => {
    try {
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
      const data = await response.json();
      if (response.ok) {
        // Actualise la liste après la mise à jour
        fetchReservation();
      } else {
        setMsg(data.msg);
      }
    } catch (error) {
      setMsg("Erreur lors de la mise à jour du statut");
    }
  };

  // Fonction pour supprimer une demande de réservations
  const deleteReservation = async (id) => {
    const isConfirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer cette réservation?`
    );

    if (isConfirmed) {
      try {
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
        const data = await response.json();
        if (response.ok) {
          setMsg(data.msg);
          // Rechargement de la liste des demandes de réservations
          fetchReservation();
          window.scrollTo(0, 0);
        } else {
          setMsg(data.msg);
        }
      } catch (error) {
        setMsg("Erreur lors du la suppression de la demande de réservation");
      }
    }
  };

  // useEffect pour charger les infos lors du montage du composant
  useEffect(() => {
    fetchReservation();
  }, []);

  // Filtrage des réservations en fonction du terme de recherche
  const filteredReservations = reservations.filter((reserve) => {
    const search = searchBar.toLowerCase();
    if (searchField === "all") {
      return (
        reserve.id.toString().includes(search) ||
        reserve.user_id.toString().includes(search) ||
        reserve.userEmail.toLowerCase().includes(search) ||
        reserve.mystDestTitle.toLowerCase().includes(search) ||
        reserve.createdDate.includes(search) ||
        reserve.reservationStatus.toLowerCase().startsWith(search)
      );
    }
    if (searchField === "id") {
      return reserve.id.toString().includes(search);
    }
    if (searchField === "user_id") {
      return reserve.user_id.toString().includes(search);
    }
    if (searchField === "email") {
      return reserve.userEmail.toString().includes(search);
    }
    if (searchField === "mystDestTitle") {
      return reserve.mystDestTitle.toLowerCase().includes(search);
    }
    if (searchField === "date") {
      return reserve.createdDate.includes(search);
    }
    if (searchField === "status") {
      return reserve.reservationStatus.toLowerCase().startsWith(search);
    }
    return false;
  });

  return (
    <main
      className="summary-table container"
      aria-label="Liste des demandes de réservation"
    >
      <button onClick={() => navigate("/dashboard")} className="back">
        <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" /> Retour au
        tableau de bord
      </button>
      <h2>Demande de réservation de voyages mystères</h2>

      <section className="search-bar">
        <div>
          <label htmlFor="search-input">
            {" "}
            <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
            Rechercher une réservation
          </label>
        </div>
        <div className="search-select-input">
          <select
            id="search-select"
            name="search"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          >
            <option value="all">Type de recherche</option>
            <option value="id">N° réservation</option>
            <option value="user_id">Identifiant utilisateur</option>
            <option value="email">Email utilisateur</option>
            <option value="mystDestTitle">Destination mystère</option>
            <option value="date">Date</option>
            <option value="status">Statut</option>
          </select>
          <input
            type="search"
            id="search-input"
            name="search"
            placeholder="Rechercher ..."
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)}
          />
        </div>
      </section>
      <section aria-live="polite">
        {msg && (
          <p className="message" role="alert">
            {msg}
          </p>
        )}
        {filteredReservations.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>N° réservation</th>
                <th>Identifiant et email utilisateur</th>
                <th>Destination mystère</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((reserve) => (
                <tr
                  key={reserve.id}
                  className={
                    reserve.reservationStatus === "Non traité"
                      ? "bold-status"
                      : ""
                  }
                >
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
                      aria-label="Modifier le status de demande de réservation de destination mystère"
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
                        aria-label={`Aller à la page de la demande de réservation ${reserve.id}`}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        onClick={() => deleteReservation(reserve.id)}
                        title={`Supprimer la demande de réservation ${reserve.id}`}
                        aria-label={`Supprimer la demande de réservation ${reserve.id}`}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-results">
            Aucun résultat trouvé pour votre recherche.
          </p>
        )}
      </section>
    </main>
  );
}

export default Reservation;
