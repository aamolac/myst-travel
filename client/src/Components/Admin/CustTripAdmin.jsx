import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTrashCan,
  faEye,
  faMagnifyingGlass,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CustTrip() {
  // État local pour stocker les demandes de voyages sur-mesure récupérées depuis l'API
  const [custTrips, setCustTrips] = useState([]);
  // État pour la barre de recherche
  const [searchBar, setSearchBar] = useState("");
  // État pour le champ sélectionné
  const [searchField, setSearchField] = useState("all");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  //Fonction pour récupérer les démandes de voyages sur-mesure
  const fetchCustTrip = async () => {
    try {
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
      const data = await response.json();
      setCustTrips(data);
    } catch (error) {
      setMsg("Erreur lors du chargement des demandes de voyage sur-mesure");
    }
  };

  // Fonction pour maj le statut
  const updateStatus = async (id, newStatus) => {
    try {
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
      const data = await response.json();
      if (response.ok) {
        // Actualise la liste après la mise à jour
        fetchCustTrip();
      } else {
        setMsg(data.msg);
      }
    } catch (error) {
      setMsg("Erreur lors de la mise à jour du statut");
    }
  };

  // Fonction pour supprimer une demande de voyages sur-mesure
  const deleteCustTrip = async (id) => {
    const isConfirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette demande de voyage sur-mesure ?"
    );

    if (isConfirmed) {
      try {
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
        const data = await response.json();
        if (response.ok) {
          setMsg(data.msg);
          // Rechargement de la liste des demandes de voyages sur-mesure
          fetchCustTrip();
          window.scrollTo(0, 0);
        } else {
          setMsg(data.msg);
        }
      } catch (error) {
        setMsg(
          "Erreur lors du la suppression de la demande de voyage ur-mesure"
        );
      }
    }
  };

  // useEffect pour charger les infos lors du montage du composant
  useEffect(() => {
    fetchCustTrip();
  }, []);

  // Filtrage des voyages sur-mesure en fonction du terme de recherche
  const filteredCustTrips = custTrips.filter((trip) => {
    const search = searchBar.toLowerCase();
    if (searchField === "all") {
      return (
        trip.id.toString().includes(search) ||
        trip.user_id.toString().includes(search) ||
        trip.userEmail.toLowerCase().includes(search) ||
        trip.createdDate.includes(search) ||
        trip.status.toLowerCase().startsWith(search)
      );
    }
    if (searchField === "id") {
      return trip.id.toString().includes(search);
    }
    if (searchField === "user_id") {
      return trip.user_id.toString().includes(search);
    }
    if (searchField === "email") {
      return trip.userEmail.toLowerCase().includes(search);
    }
    if (searchField === "date") {
      return trip.createdDate.includes(search);
    }
    if (searchField === "status") {
      return trip.status.toLowerCase().startsWith(search);
    }
    return false;
  });

  return (
    <main
      className="summary-table container"
      aria-label="Liste des demandes de voyage sur-mesure"
    >
      <button onClick={() => navigate("/dashboard")} className="back">
        <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" /> Retour au
        tableau de bord
      </button>
      <h2>Demande de voyage sur-mesure</h2>

      <section className="search-bar">
        <div>
          <label htmlFor="search-input">
            {" "}
            <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
            Rechercher une demande de voyage sur-mesure
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
            <option value="id">N° demande</option>
            <option value="user_id">Identifiant utilisateur</option>
            <option value="email">Email utilisateur</option>
            <option value="date">Date</option>
            <option value="status">Status</option>
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
        {filteredCustTrips.length > 0 ? (
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
              {filteredCustTrips.map((trip) => (
                <tr
                  key={trip.id}
                  className={trip.status === "Non traité" ? "bold-status" : ""}
                >
                  <td>{trip.id}</td>
                  <td>{trip.user_id}</td>
                  <td>{trip.userEmail}</td>
                  <td>{trip.createdDate}</td>
                  <td>{trip.status}</td>
                  <td className="table-button">
                    <select
                      value={trip.status}
                      onChange={(e) => updateStatus(trip.id, e.target.value)}
                      aria-label="Modifier le status de demande de destination sur-mesure"
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
                        aria-label={`Aller à la page de la demande de destination sur-mesure ${trip.id}`}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        onClick={() => deleteCustTrip(trip.id)}
                        title={`Supprimer la demande de destination sur-mesure ${trip.id}`}
                        aria-label={`Supprimer la demande de destination sur-mesure ${trip.id}`}
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

export default CustTrip;
