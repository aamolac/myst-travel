import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// Pour récupérer l'ID de la demande depuis l'URL
import { useParams, useNavigate } from "react-router-dom";

function ContactDetail() {
  const { id } = useParams();
  const [contacts, setContacts] = useState(null);
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const fetchContact = async () => {
    const response = await fetch(`http://localhost:9000/api/v1/contact/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    setContacts(data);
  };

  useEffect(() => {
    fetchContact();
  }, [id]);

  // Fonction pour modifier le status en "Répondu"
  const markAsReplied = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/contact/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status: 2 }), // Status 2 pour "Répondu"
        }
      );

      if (response.ok) {
        setContacts({ ...contacts, status: "Répondu" });
      } else {
        setMsg("Erreur lors de la mise à jour du statut");
      }
    } catch (error) {
      setMsg("Erreur lors de la mise à jour du statut");
    }
  };

  // Vérifie si les données de la demande ont été récupérées
  if (!contacts) return <p>Chargement...</p>;

  return (
    <main>
      <button
        onClick={() => navigate(-1)}
        title="Retour à la page des demandes de contact"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </button>
      <p>Adresse mail : {contacts.email} </p>
      <p>Objet : {contacts.choice}</p>
      <p>Message : {contacts.message}</p>
      <p>Date : {contacts.publishDate}</p>
      {contacts.status === "Répondu" && <p>Status : {contacts.status}</p>}
      {contacts.status !== "Répondu" && (
        <button onClick={markAsReplied}>Répondu</button>
      )}
      {msg && <p className="message">{msg}</p>}
    </main>
  );
}

export default ContactDetail;
