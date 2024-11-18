import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// Pour récupérer l'ID de la demande depuis l'URL
import { useParams, useNavigate } from "react-router-dom";

function CustTripDetail() {
  const { id } = useParams();
  const [custTrips, setCustTrips] = useState(null);
  const navigate = useNavigate();

  const fetchCustTrip = async () => {
    const response = await fetch(
      `http://localhost:9000/api/v1/customized-trip/${id}`,
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
  };

  useEffect(() => {
    fetchCustTrip();
  }, [id]);

  // Vérifie si les données de la demande ont été récupérées
  if (!custTrips) return <p>Chargement...</p>;

  return (
    <main>
      <button
        onClick={() => navigate(-1)}
        title="Retour à la page des demandes de destination sur-mesure"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </button>
      <p>Identifiant de l'utilisateur : {custTrips.user_id}</p>
      <p>Email de l'utilisateur : {custTrips.userEmail}</p>
      <p>Type d'expérience : {custTrips.typeExperienceChoice} </p>
      <p>Durée du séjour : {custTrips.duration}</p>
      <p>Budget total par personne : {custTrips.budget}</p>
      <p>Climat : {custTrips.climateChoice}</p>
      <p>Hébergement : {custTrips.accomodationChoice}</p>
      <p>Activité : {custTrips.activityChoice}</p>
      <p>Lieu de la destination : {custTrips.locationChoice}</p>
      <p>Culture : {custTrips.cultureChoice}</p>
      <p>Nombre d'adulte (à partir de 12 ans) : {custTrips.numberAdult}</p>
      <p>
        Nombre d'enfant : {custTrips.numberChild ? custTrips.numberChild : 0}
      </p>
      <p>
        Restriction : {custTrips.restriction ? custTrips.restriction : "Aucune"}
      </p>
      <p>Date : {custTrips.createdDate}</p>
      <p>Status : {custTrips.status}</p>
    </main>
  );
}

export default CustTripDetail;
