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

  // Met à jour le titre à chaque fois que l'id change
  useEffect(() => {
    document.title = `Demande de contact #${id} - Myst'Travel`;
  }, [id]);

  const fetchContact = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/contact/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        if (response.status === 404) {
          navigate("/*");
          return;
        }
        throw new Error(
          "Une erreur est survenue lors de la récupération des données..."
        );
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      setContacts({
        error: `Impossible de récupérer les données de la demande de contact. Veuillez réessayer plus tard. Détails de l'erreur : ${error.message}`,
      });
    }
  };

  useEffect(() => {
    fetchContact();
  }, [id]);

  // Vérifie si les données de la demande ont été récupérées
  if (!contacts) return <p>Chargement...</p>;

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
          // Status 2 pour "Répondu"
          body: JSON.stringify({ status: 2 }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMsg(data.msg);
        setContacts({ ...contacts, status: "Répondu" });
        window.scrollTo(0, 0);
      } else {
        setMsg(data.msg);
      }
    } catch (error) {
      setMsg("Erreur lors de la mise à jour du statut");
    }
  };

  return (
    <main
      className="contact-admin container"
      aria-label="Détail d'une demande de contact"
    >
      <button
        onClick={() => navigate("/dashboard/contact")}
        title="Retour à la page des demandes de contact"
        className="back"
        aria-label="Retour à la page des demandes de contact"
      >
        <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" /> Retour
      </button>
      <h2>Message</h2>

      <section>
        {msg && (
          <p className="message" role="alert">
            {msg}
          </p>
        )}
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

        {contacts.status === "Répondu" && (
          <p>
            <span>Statut :</span> {contacts.status}
          </p>
        )}
        {contacts.status !== "Répondu" && (
          <button
            onClick={markAsReplied}
            aria-label="Modifier le status de la demande de contact en Répondu"
          >
            Répondu
          </button>
        )}
      </section>
    </main>
  );
}

export default ContactDetail;
