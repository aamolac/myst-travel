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

  // Met à jour le titre à chaque fois que l'id change
  useEffect(() => {
    if (destination && destination.title) {
      document.title = `${destination.title} - Myst'Travel`;
    }
  }, [destination]);

  const fetchDestination = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/myst-dest/${id}`,
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
      setDestination(data);
    } catch (error) {
      setDestination({
        error: `Impossible de récupérer les données de la destination. Veuillez réessayer plus tard. Détails de l'erreur : ${error.message}`,
      });
    }
  };

  useEffect(() => {
    fetchDestination();
  }, [id]);

  // Vérifie si les données de la destination ont été récupérées
  if (!destination) return <p>Chargement...</p>;

  // Redirige vers la page de réservation avec l'ID de la destination
  const handleReservationClick = () => {
    navigate(`/myst-destination/${id}/reserve`);
    window.scrollTo(0, 0);
  };

  return (
    <main
      id="myst-dest-detail"
      className="container"
      aria-label="Page de la destination mystère"
    >
      <nav
        className="menu-accessible"
        role="navigation"
        aria-label="Menu accessible avec tabulation"
      >
        <a href={`#${destination.title}`}>{destination.title}</a>
        <a href="#clue1">Indice n°1 : La région géographique</a>
        <a href="#clue2">Indice n°2 : Le climat</a>
        <a href="#clue3">Indice n°3 : Le type d'expérience</a>
        <a href="#clue4">Indice n°4 : Le niveau d’activité physique</a>
        <a href="#budget-duration">Budget et durée</a>
        <a href="#your-turn-to-play">À vous de jouer</a>
      </nav>
      <button
        onClick={() => navigate("/myst-destination")}
        title="Retour à la page des destinations mystères"
        className="back"
        aria-label="Retour à la page des destinations mystères"
      >
        <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" /> Retour
      </button>
      <section className="information-destination" id={destination.title}>
        <h2>{destination.title}</h2>
        <div>
          <img
            src={`http://localhost:9000/img/upload-MystDest/${destination.image}`}
            alt={destination.alt}
          />
        </div>
        <div id="clue1">
          <h3>
            <FontAwesomeIcon icon={faEarthAmericas} aria-hidden="true" /> Indice
            n°1 : La région géographique
          </h3>
          <p>{destination.locationClue}</p>

          <p>
            <span>Continent :</span> {destination.continent}
          </p>
        </div>
        <div id="clue2">
          <h3>
            <FontAwesomeIcon
              icon={faTemperatureThreeQuarters}
              aria-hidden="true"
            />{" "}
            Indice n°2 : Le climat
          </h3>
          <p>{destination.climateClue}</p>
          <p>
            <span>Climat :</span> {destination.climate}
          </p>
        </div>
        <div id="clue3">
          <h3>
            <FontAwesomeIcon icon={faMountainCity} aria-hidden="true" /> Indice
            n°3 : Le type d'expérience
          </h3>
          <p>{destination.experienceClue}</p>
          <p>
            <span>Type d'hébergement :</span> {destination.accomodation}
          </p>
        </div>
        <div id="clue4">
          <h3>
            <FontAwesomeIcon icon={faPersonRunning} aria-hidden="true" /> Indice
            n°4 : Le niveau d’activité physique
          </h3>
          <p>{destination.activityClue}</p>
          <p>
            <span>Activité :</span> {destination.activity}
          </p>
        </div>
        <div id="budget-duration">
          <h3>Budget et durée</h3>
          <p>
            <FontAwesomeIcon icon={faSackDollar} aria-hidden="true" />{" "}
            <span>Budget par jour/personne :</span> {destination.budget} €
          </p>
          <p className="info-price">
            Veuillez noter que les frais de transport aérien ne sont pas inclus
            dans ce tarif et peuvent varier en fonction de votre lieu de départ,
            de la saison, de la demande et des compagnies aériennes
            sélectionnées. Réserver à l'avance peut contribuer à réduire le coût
            total du transport.
          </p>
          <p>
            <FontAwesomeIcon icon={faCalendarDays} aria-hidden="true" />{" "}
            <span>Durée :</span> {destination.minDuration} à{" "}
            {destination.maxDuration} jours
          </p>
        </div>
      </section>
      <section id="your-turn-to-play">
        <h2>À vous de jouer</h2>
        <div>
          <p>
            Saurez-vous deviner où vous mènera ce voyage mystère ? Faites vos
            bagages, laissez-vous surprendre, et embarquez pour une aventure que
            vous n’oublierez jamais. Le mystère fait partie du voyage... et
            votre destination n’attend que vous.
          </p>
          <img
            src="/src/assets/images/myst-dest/destination-detail.webp"
            alt="Une femme regardant une carte papier"
          />
        </div>
        <button
          onClick={handleReservationClick}
          aria-label="Réserver la destination mystère"
        >
          Réserver
        </button>
      </section>
    </main>
  );
}

export default MystDestDetail;
