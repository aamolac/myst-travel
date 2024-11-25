import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEarthAmericas,
  faTemperatureThreeQuarters,
  faMountainCity,
  faPersonRunning,
  faSackDollar,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
// Pour récupérer l'ID de la destination depuis l'URL
import { useParams, useNavigate } from "react-router-dom";

function MystDestDetail() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const navigate = useNavigate();

  const fetchDestination = async () => {
    const response = await fetch(
      `http://localhost:9000/api/v1/myst-dest/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    setDestination(data);
  };

  useEffect(() => {
    fetchDestination();
  }, [id]);

  // Vérifie si les données de la destination ont été récupérées
  if (!destination) return <p>Chargement...</p>;

  // Redirige vers la page de réservation avec l'ID de la destination
  const handleReservationClick = () => {
    navigate(`/myst-destination/${id}/reserve`); // Redirection vers la route de réservation
  };

  return (
    <main id="myst-dest-detail">
      <button onClick={() => navigate("/myst-destination")} className="back">
        <FontAwesomeIcon icon={faArrowLeft} /> Retour aux destinations mystères
      </button>
      <section className="information-destinaiton">
        <h2>{destination.title}</h2>
        <div>
          <img
            src={`http://localhost:9000/img/upload-MystDest/${destination.image}`}
            alt={destination.alt}
          />
        </div>
        <h3>
          <FontAwesomeIcon icon={faEarthAmericas} /> Indice n°1 : La région
          géographique
        </h3>
        <p>{destination.locationClue}</p>
        <p>
          <span>Continent :</span> {destination.continent}
        </p>

        <h3>
          <FontAwesomeIcon icon={faTemperatureThreeQuarters} /> Indice n°2 : Le
          climat
        </h3>
        <p>{destination.climateClue}</p>
        <p>
          <span>Climat :</span> {destination.climate}
        </p>

        <h3>
          <FontAwesomeIcon icon={faMountainCity} /> Indice n°3 : Le type
          d'expérience
        </h3>
        <p>{destination.experienceClue}</p>
        <p>
          <span>Type d'hébergement :</span> {destination.accomodation}
        </p>

        <h3>
          <FontAwesomeIcon icon={faPersonRunning} /> Indice n°4 : Le niveau
          d’activité physique
        </h3>
        <p>{destination.activityClue}</p>
        <p>
          <span>Activité :</span> {destination.activity}
        </p>

        <h3>Budget et durée</h3>
        <p>
          <FontAwesomeIcon icon={faSackDollar} />{" "}
          <span>Budget par jour/personne :</span> {destination.budget} €
        </p>
        <p className="info-price">
          Veuillez noter que les frais de transport aérien ne sont pas inclus
          dans ce tarif et peuvent varier en fonction de votre lieu de départ,
          de la saison, de la demande et des compagnies aériennes sélectionnées.
          Réserver à l'avance peut contribuer à réduire le coût total du
          transport.
        </p>
        <p>
          <FontAwesomeIcon icon={faCalendarDays} /> <span>Durée :</span>{" "}
          {destination.minDuration} à {destination.maxDuration} jours
        </p>
      </section>
      <section>
        <h2>À Vous de Jouer</h2>
        <p>
          Saurez-vous deviner où vous mènera ce voyage mystère ? Faites vos
          bagages, laissez-vous surprendre, et embarquez pour une aventure que
          vous n’oublierez jamais. Le mystère fait partie du voyage... et votre
          destination n’attend que vous.
        </p>
        <img
          src="/src/assets/images/destination-detail.webp"
          alt="Une femme regardant une carte papier"
        />
        <button onClick={handleReservationClick}>Réserver</button>
      </section>
    </main>
  );
}

export default MystDestDetail;
