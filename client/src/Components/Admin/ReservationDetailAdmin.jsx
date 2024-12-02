import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ReservationDetail() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Réservation #${id} - Myst'Travel`;
  }, [id]); // Met à jour chaque fois que l'id change

  const fetchReservation = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/reservation/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          navigate("/*"); // Redirige vers la page "PageNotFound"
          return;
        }
        throw new Error(
          "Une erreur est survenue lors de la récupération des données.."
        );
      }

      const data = await response.json();
      setReservation(data);
    } catch (error) {
      setReservation({ error: error.message });
    }
  };

  useEffect(() => {
    fetchReservation();
  }, [id]);

  // Vérifie si les données de la réservation ont été récupérées
  if (!reservation) return <p>Chargement...</p>;

  return (
    <main className="reservation-admin">
      <button
        onClick={() => navigate(-1)}
        title="Retour à la page des réservations"
        className="back"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </button>
      <h2>Réservation n°{reservation.id}</h2>
      <section className="container">
        <p>
          <span>Date de la demande :</span> {reservation.createdDate}
        </p>
        <p>
          <span>Identifiant de l'utilisateur :</span> {reservation.user_id}
        </p>
        <p>
          <span>Email de l'utilisateur :</span>{" "}
          <a href={`mailto:${reservation.userEmail}`}>
            {reservation.userEmail}
          </a>
        </p>
        <p>
          <span>Destination mystère :</span> identifiant{" "}
          {reservation.mystDestination_id} - {reservation.mystDestTitle}
        </p>
        <p>
          <span>Date de départ:</span> {reservation.startDate}
        </p>
        <p>
          <span>Date de fin :</span> {reservation.endDate}
        </p>
        <p>
          <span>Nombre d'adulte (à partir de 12 ans) :</span>{" "}
          {reservation.numberAdult}
        </p>
        <p>
          <span>Nombre d'enfant :</span>{" "}
          {reservation.numberChild ? reservation.numberChild : 0}
        </p>

        <p>
          <span>Status :</span> {reservation.reservationStatus}
        </p>
      </section>
    </main>
  );
}

export default ReservationDetail;
