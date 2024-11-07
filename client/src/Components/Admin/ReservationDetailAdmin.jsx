import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ReservationDetail() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const navigate = useNavigate();

  const fetchReservation = async () => {
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

    const data = await response.json();
    setReservation(data);
  };

  useEffect(() => {
    fetchReservation();
  }, [id]);

  // Vérifie si les données de la réservation ont été récupérées
  if (!reservation) return <p>Chargement...</p>;

  return (
    <main>
      <button
        onClick={() => navigate(-1)}
        title="Retour à la page des réservations"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </button>
      <p>Identifiant de l'utilisateur : {reservation.user_id}</p>
      <p>Email de l'utilisateur : {reservation.userEmail}</p>
      <p>Destination mystère : {reservation.mystDestination_id}</p>
      <p>Date de départ: {reservation.startDate} </p>
      <p>Date de fin : {reservation.endDate}</p>
      <p>Nombre d'adulte (à partir de 12 ans) : {reservation.numberAdult}</p>
      <p>
        Nombre d'enfant :{reservation.numberChild ? reservation.numberChild : 0}
      </p>
      <p>Date : {reservation.createdDate}</p>
      <p>Status : {reservation.status}</p>
    </main>
  );
}

export default ReservationDetail;
