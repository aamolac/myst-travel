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
    <main className="contact-cust-trip-reservation">
      <button
        onClick={() => navigate(-1)}
        title="Retour à la page des demandes de contact"
        className="back"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </button>
      <h2>Message</h2>
      {msg && <p className="message">{msg}</p>}
      <section>
        <p>
          <span>Date de la demande :</span> {contacts.publishDate}
        </p>
        <p>
          <span>Adresse mail :</span>{" "}
          <a href={`mailto:${contacts.email}`}>{contacts.email}</a>{" "}
        </p>
        <p>
          <span>Objet :</span> {contacts.choice}
        </p>
        <p>
          <span>Message :</span> {contacts.message}
        </p>

        {contacts.status === "Répondu" && <p>Status : {contacts.status}</p>}
        {contacts.status !== "Répondu" && (
          <button onClick={markAsReplied}>Répondu</button>
        )}
      </section>
    </main>
  );
}

export default ContactDetail;
