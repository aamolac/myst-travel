import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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
    <main>
      <button
        onClick={() => navigate("/myst-destination")}
        title="Retour à la page des destinations mystères"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </button>
      <h2>{destination.title}</h2>
      <img
        src={`http://localhost:9000/img/upload-MystDest/${destination.image}`}
        alt={destination.alt}
      />
      <h3>Indice n°1 : Le Climat</h3>
      <p>{destination.climate}</p>

      <h3>Indice n°2 : Le Type d'Expérience</h3>
      <p>{destination.experience}</p>

      <h3>Indice n°3 : Le Niveau d’Activité Physique</h3>
      <p>{destination.activity}</p>

      <h3>Indice n°4 : La Région Géographique</h3>
      <p>{destination.location}</p>

      <h3>Budget et durée recommandée</h3>
      <p>{destination.budget} €</p>
      <p>
        Veuillez noter que le coût du billet d'avion n'est pas inclus dans ce
        prix et peut varier en fonction de votre lieu de départ et de la saison.
      </p>
      <p>Durée recommandée : {destination.recoDuration} jours</p>

      <h3>À Vous de Jouer</h3>
      <p>
        Saurez-vous deviner où vous mènera ce voyage mystère ? Faites vos
        bagages, laissez-vous surprendre, et embarquez pour une aventure que
        vous n’oublierez jamais. Le mystère fait partie du voyage... et votre
        destination n’attend que vous.
      </p>
      <button onClick={handleReservationClick}>Réserver</button>
    </main>
  );
}

export default MystDestDetail;
