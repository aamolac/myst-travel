import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTrashCan,
  faPenToSquare,
  faPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MystDest() {
  // État local pour stocker les destinations mystères récupérées
  const [mystDests, setMystDests] = useState([]);
  // État pour la barre de recherche
  const [searchBar, setSearchBar] = useState("");
  // État pour le champ sélectionné
  const [searchField, setSearchField] = useState("all");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // Fonction de mappage pour convertir le statut en valeur numérique
  const getStatusValue = (statusLabel) => {
    switch (statusLabel) {
      case "En ligne":
        return 0;
      case "Hors ligne":
        return 1;
      default:
        return 0;
    }
  };

  //Fonction pour récupérer les destinations mystères
  const fetchMystDest = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/v1/myst-dest/list",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setMystDests(data);
    } catch (error) {
      setMsg("Erreur lors du chargement des destinations mystères");
    }
  };

  // Fonction pour maj le statut
  const updateStatus = async (id, newStatusLabel) => {
    try {
      // Convertit le label en entier
      const newStatus = getStatusValue(newStatusLabel);
      const response = await fetch(
        `http://localhost:9000/api/v1/myst-dest/updateStatus/${id}`,
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
        fetchMystDest();
      } else {
        setMsg(data.msg);
      }
    } catch (error) {
      setMsg("Erreur lors de la mise à jour du statut");
    }
  };

  // Fonction pour supprimer une destination mystère
  const deleteMystDest = async (id) => {
    const isConfirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer cette destination mystère (identifiant ${id}) ?`
    );

    if (isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/myst-dest/delete/${id}`,
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
          // Rechargement de la liste des destinations mystères
          fetchMystDest();
          window.scrollTo(0, 0);
        } else {
          setMsg(data.msg);
        }
      } catch (error) {
        setMsg("Erreur lors du la suppression de la destination mystère");
      }
    }
  };

  // useEffect pour charger les infos lors du montage du composant
  useEffect(() => {
    fetchMystDest();
  }, []);

  // Filtrage des destinations mystères en fonction du terme de recherche
  const filteredMystDest = mystDests.filter((mystDest) => {
    const search = searchBar.toLowerCase();
    if (searchField === "all") {
      return (
        mystDest.id.toString().includes(search) ||
        mystDest.title.toLowerCase().includes(search) ||
        mystDest.status.toLowerCase().startsWith(search)
      );
    }
    if (searchField === "id") {
      return mystDest.id.toString().includes(search);
    }
    if (searchField === "title") {
      return mystDest.title.toLowerCase().includes(search);
    }
    if (searchField === "status") {
      return contact.status.toLowerCase().startsWith(search);
    }
    return false;
  });

  return (
    <main
      className="summary-table container"
      aria-label="Liste des destinations mystères"
    >
      <button
        onClick={() => navigate("/dashboard")}
        title="Retour au tableau de bord"
        className="back"
      >
        <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" /> Retour au
        tableau de bord
      </button>
      <h2>Destination mystère</h2>

      <section className="search-bar">
        <div>
          <label htmlFor="search-input">
            {" "}
            <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
            Rechercher une destination mystère
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
            <option value="id">N° destination</option>
            <option value="title">Titre</option>
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
        <div className="add-myst-dest">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate(`/dashboard/myst-destination/add`);
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Ajouter une destination mystère
          </button>
        </div>
        {msg && (
          <p className="message" role="alert">
            {msg}
          </p>
        )}
        {filteredMystDest.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>N° destination</th>
                <th>Titre</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredMystDest.map((mystDest) => (
                <tr key={mystDest.id}>
                  <td>{mystDest.id}</td>
                  <td>{mystDest.title}</td>
                  <td>{mystDest.status}</td>
                  <td className="table-button">
                    {getStatusValue(mystDest.status) === 0 && (
                      <button
                        onClick={() => updateStatus(mystDest.id, "Hors ligne")}
                        title="Mettre la destination en hors ligne"
                        aria-label="Mettre la destination en hors ligne"
                      >
                        Hors ligne
                      </button>
                    )}
                    {getStatusValue(mystDest.status) === 1 && (
                      <button
                        onClick={() => updateStatus(mystDest.id, "En ligne")}
                        title="Mettre la destination en ligne"
                        aria-label="Mettre la destination en ligne"
                      >
                        En ligne
                      </button>
                    )}
                    <div>
                      <button
                        onClick={() => {
                          window.scrollTo(0, 0);
                          navigate(
                            `/dashboard/myst-destination/update/${mystDest.id}`
                          );
                        }}
                        title={`Modifier la destination mystère ${mystDest.id}`}
                        aria-label={`Modifier la destination mystère ${mystDest.id}`}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button
                        onClick={() => deleteMystDest(mystDest.id)}
                        title={`Supprimer la destination mystère ${mystDest.id}`}
                        aria-label={`Supprimer la destination mystère ${mystDest.id}`}
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

export default MystDest;
