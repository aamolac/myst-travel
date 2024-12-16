import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTrashCan,
  faEye,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  // État local pour stocker les demandes de contact récupérées depuis l'API
  const [contacts, setContacts] = useState([]);
  // État pour la barre de recherche
  const [searchBar, setSearchBar] = useState("");
  // État pour le champ sélectionné
  const [searchField, setSearchField] = useState("all");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  //Fonction pour récupérer les demandes de contact
  const fetchContact = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/v1/contact/list",
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      setMsg("Erreur lors du chargement des demandes de contact");
    }
  };

  // Fonction pour marquer un contact comme "Lu"
  const markAsRead = async (id) => {
    // Parcourir les contacts pour vérifier le statut
    for (const contact of contacts) {
      if (contact.id === id && contact.status !== "Non lu") {
        // Si le contact est déjà "Lu" ou "Répondu", on arrête la fonction
        return;
      }
    }
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/contact/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          // Envoi du statut "Lu"
          body: JSON.stringify({ status: 1 }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Actualise la liste après la mise à jour
        fetchContact();
      } else {
        setMsg(data.msg);
      }
    } catch (error) {
      setMsg("Erreur lors de la mise à jour du statut");
    }
  };

  // Fonction pour supprimer une demande de contact
  const deleteContact = async (id) => {
    const isConfirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer la demande de contact n° ${id} ?`
    );

    if (isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/contact/delete/${id}`,
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
          // Rechargement de la liste des demandes de contact
          fetchContact();
          window.scrollTo(0, 0);
        } else {
          setMsg(data.msg);
        }
      } catch (error) {
        setMsg("Erreur lors du la suppression de la demande de contact");
      }
    }
  };

  // useEffect pour charger les infos lors du montage du composant
  useEffect(() => {
    fetchContact();
  }, []);

  // Filtrage des demandes de contact en fonction du terme de recherche
  const filteredContacts = contacts.filter((contact) => {
    const search = searchBar.toLowerCase();
    if (searchField === "all") {
      return (
        contact.id.toString().includes(search) ||
        contact.email.toLowerCase().includes(search) ||
        contact.choice.toLowerCase().includes(search) ||
        contact.message.toLowerCase().includes(search) ||
        contact.publishDate.includes(search) ||
        contact.status.toLowerCase().startsWith(search)
      );
    }
    if (searchField === "id") {
      return contact.id.toString().includes(search);
    }
    if (searchField === "email") {
      return contact.email.toLowerCase().includes(search);
    }
    if (searchField === "choice") {
      return contact.choice.toLowerCase().includes(search);
    }
    if (searchField === "message") {
      return contact.message.toLowerCase().includes(search);
    }
    if (searchField === "date") {
      return contact.publishDate.includes(search);
    }
    if (searchField === "status") {
      return contact.status.toLowerCase().startsWith(search);
    }
    return false;
  });

  return (
    <main
      className="summary-table container"
      aria-label="Liste des demandes de contact"
    >
      <button onClick={() => navigate("/dashboard")} className="back">
        <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" /> Retour au
        tableau de bord
      </button>
      <h2>Demande de contact</h2>

      <section className="search-bar">
        <div>
          <label htmlFor="search-input">
            {" "}
            <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
            Rechercher une demande de contact
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
            <option value="email">Adresse mail</option>
            <option value="choice">Objet</option>
            <option value="message">Message</option>
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
            {msg}{" "}
          </p>
        )}
        {filteredContacts.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>N° demande</th>
                <th>Adresse mail</th>
                <th>Objet</th>
                <th>Message</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className={contact.status === "Non lu" ? "bold-status" : ""}
                >
                  <td>{contact.id}</td>
                  <td>{contact.email}</td>
                  <td>{contact.choice}</td>
                  <td>
                    {contact.message.length > 50
                      ? `${contact.message.slice(0, 50)}...`
                      : contact.message}
                  </td>
                  <td>{contact.publishDate}</td>
                  <td>{contact.status}</td>
                  <td className="contact-button">
                    <button
                      onClick={() => {
                        markAsRead(contact.id);
                        window.scrollTo(0, 0);
                        navigate(`/dashboard/contact/${contact.id}`);
                      }}
                      title={`Aller à la page de la demande de contact ${contact.id}`}
                      aria-label={`Aller à la page de la demande de contact ${contact.id}`}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      onClick={() => deleteContact(contact.id)}
                      title={`Supprimer de la demande de contact ${contact.id}`}
                      aria-label={`Supprimer de la demande de contact ${contact.id}`}
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

export default Contact;
