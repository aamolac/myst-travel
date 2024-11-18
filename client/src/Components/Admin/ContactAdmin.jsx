import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  // État local pour stocker les demandes de contact récupérées depuis l'API
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  // Pour gérer les messages de retour
  const [msg, setMsg] = useState("");

  //pour récupérer les démandes de contact
  const fetchContact = async () => {
    const response = await fetch("http://localhost:9000/api/v1/contact/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    //convertit la réponse en json
    const data = await response.json();
    //mise à jour de l'état avec les demandes récupérées
    setContacts(data);
  };

  // Fonction pour marquer un contact comme "Lu"
  const markAsRead = async (id) => {
    // Parcourir les contacts pour vérifier le statut
    for (const contact of contacts) {
      if (contact.id === id && contact.status !== "Non lu") {
        return; // Si le contact est déjà "Lu" ou "Répondu", on arrête la fonction
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
          body: JSON.stringify({ status: 1 }), // Envoi du statut "Lu"
        }
      );
      if (response.ok) {
        // Recharger la liste des contacts pour afficher la mise à jour du statut
        fetchContact();
      } else {
        setMsg("Erreur lors de la mise à jour du statut");
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

      // Vérifie si la suppression a été effectuée avec succès
      if (response.ok) {
        // Rechargement de la liste des demandes de contact
        fetchContact();
      } else {
        setMsg("Erreur lors de la suppression de la demande de contact");
      }
    }
  };

  // useEffect pour charger les infos lors du montage du composant
  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <main>
      <button
        onClick={() => navigate("/dashboard")}
        title="Retour à la page du dashboard"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </button>
      <h2>Demande de contact</h2>

      {msg && <p className="message">{msg}</p>}
      <table>
        <thead>
          <tr>
            <th>Numéro de la demande</th>
            <th>Adresse mail</th>
            <th>Objet</th>
            <th>Message</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
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
              <td>
                <button
                  onClick={() => {
                    markAsRead(contact.id);
                    navigate(`/dashboard/contact/${contact.id}`);
                  }}
                  title={`Aller à la page de la demande de contact ${contact.id}`}
                >
                  Voir
                </button>
                <button onClick={() => deleteContact(contact.id)}>
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

export default Contact;
