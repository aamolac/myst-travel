import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// Pour récupérer l'ID de la demande depuis l'URL
import { useParams, useNavigate } from "react-router-dom";

function CustTripDetail() {
  const { id } = useParams();
  const [custTrips, setCustTrips] = useState(null);
  const navigate = useNavigate();

  // Met à jour le titre à chaque fois que l'id change
  useEffect(() => {
    document.title = `Demande de voyage sur-mesure #${id} - Myst'Travel`;
  }, [id]);

  const fetchCustTrip = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/customized-trip/${id}`,
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
      setCustTrips(data);
    } catch (error) {
      setCustTrips({
        error: `Impossible de récupérer les données de la demande de voyage sur-mesure. Veuillez réessayer plus tard. Détails de l'erreur : ${error.message}`,
      });
    }
  };

  useEffect(() => {
    fetchCustTrip();
  }, [id]);

  // Vérifie si les données de la demande ont été récupérées
  if (!custTrips) return <p>Chargement...</p>;

  return (
    <main
      className="cust-trip-admin container"
      aria-label="Détail d'une demande de voyage sur-mesure"
    >
      <button
        onClick={() => navigate("/dashboard/customized-trip")}
        title="Retour à la page des demandes de destination sur-mesure"
        className="back"
        aria-label="Retour à la page des demandes de destination sur-mesure"
      >
        <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" /> Retour
      </button>
      <h2>Demande de voyage sur-mesure n° {custTrips.id}</h2>
      <section>
        <p>
          <span>Date de la demande :</span> {custTrips.createdDate}
        </p>
        <p>
          <span>Identifiant de l'utilisateur :</span> {custTrips.user_id}
        </p>
        <p>
          <span>Email de l'utilisateur :</span>{" "}
          <a href={`mailto:${custTrips.userEmail}`}>{custTrips.userEmail}</a>{" "}
        </p>
        <p>
          <span>Type d'expérience :</span> {custTrips.typeExperienceChoice}{" "}
        </p>

        <p>
          <span>Climat :</span> {custTrips.climateChoice}
        </p>
        <p>
          <span>Hébergement :</span> {custTrips.accomodationChoice}
        </p>
        <p>
          <span>Activité :</span> {custTrips.activityChoice}
        </p>
        <p>
          <span>Lieu de la destination :</span> {custTrips.locationChoice}
        </p>
        <p>
          <span>Culture :</span> {custTrips.cultureChoice}
        </p>
        <p>
          <span>Nombre d'adulte (à partir de 12 ans) :</span>{" "}
          {custTrips.numberAdult}
        </p>
        <p>
          <span>Nombre d'enfant :</span>{" "}
          {custTrips.numberChild ? custTrips.numberChild : 0}
        </p>
        <p>
          <span>Restriction :</span>{" "}
          {custTrips.restriction ? custTrips.restriction : "Aucune"}
        </p>
        <p>
          <span>Durée du séjour :</span> {custTrips.duration} jours
        </p>
        <p>
          <span>Budget total par personne :</span> {custTrips.budget} €
        </p>

        <p>
          <span>Statut :</span> {custTrips.status}
        </p>
      </section>
    </main>
  );
}

export default CustTripDetail;
