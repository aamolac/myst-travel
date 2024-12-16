import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTrashCan,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function User() {
  // État local pour stocker les utilisateurs récupérées depuis l'API
  const [users, setUsers] = useState([]);
  // État pour la barre de recherche
  const [searchBar, setSearchBar] = useState("");
  // État pour le champ sélectionné
  const [searchField, setSearchField] = useState("all");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // Fonction pour récupérer les utilisateurs
  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/v1/user/list", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setMsg("Erreur lors du chargement des utilisateurs");
    }
  };

  // Fonction pour supprimer un utilisateur
  const deleteUser = async (id) => {
    const isConfirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer cet utilisateur avec l'identifiant ${id}?`
    );

    if (isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/user/delete/${id}`,
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
          // Rechargement de la liste des utilisateurs
          fetchUser();
          window.scrollTo(0, 0);
        } else {
          setMsg(data.msg);
        }
      } catch (error) {
        setMsg("Erreur lors du la suppression de l'utilisateur");
      }
    }
  };
  // useEffect pour charger les infos lors du montage du composant
  useEffect(() => {
    fetchUser();
  }, []);

  // Filtrage des utilisateurs en fonction du terme de recherche
  const filteredUsers = users.filter((user) => {
    const search = searchBar.toLowerCase();
    if (searchField === "all") {
      return (
        user.id.toString().includes(search) ||
        user.firstname.toLowerCase().includes(search) ||
        user.lastname.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.createdDate.includes(search)
      );
    }
    if (searchField === "id") {
      return user.id.toString().includes(search);
    }
    if (searchField === "firstname") {
      return user.firstname.toLowerCase().includes(search);
    }
    if (searchField === "lastname") {
      return user.lastname.toLowerCase().includes(search);
    }
    if (searchField === "email") {
      return user.email.toLowerCase().includes(search);
    }
    if (searchField === "createdDate") {
      return user.createdDate.includes(search);
    }
    return false;
  });

  return (
    <main
      className="summary-table container"
      aria-label="Liste des utilisateurs"
    >
      <button onClick={() => navigate("/dashboard")} className="back">
        <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" /> Retour au
        tableau de bord
      </button>
      <h2>Liste des utilisateurs</h2>

      <section className="search-bar">
        <div>
          <label htmlFor="search-input">
            {" "}
            <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
            Rechercher un utilisateur
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
            <option value="id">Identifiant</option>
            <option value="firstname">Prénom</option>
            <option value="lastname">Nom</option>
            <option value="email">Email</option>
            <option value="createdDate">Date</option>
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
        {filteredUsers.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Identifiant</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Adresse mail</th>
                <th>Date de création du compte</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.createdDate}</td>
                  <td>
                    <button
                      onClick={() => deleteUser(user.id)}
                      title={`Supprimer l'utilisateur ${user.id}`}
                      aria-label={`Supprimer l'utilisateur ${user.id}`}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
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

export default User;
