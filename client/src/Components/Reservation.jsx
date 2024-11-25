import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoginContext } from "../store/user/Context.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

function Reservation() {
  // Récupère l'ID de la destination depuis l'URL
  const { id } = useParams();
  // Récupère l'utilisateur connecté depuis le contexte
  const { user } = useContext(LoginContext);
  const [formReservation, setFormReservation] = useState({
    startDate: "",
    endDate: "",
    numberAdult: "",
    numberChild: "",
  });
  // Pour stocker les détails de la destination
  const [destination, setDestination] = useState(null);
  const [calculatedBudget, setCalculatedBudget] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);

  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Récupérer les informations de la destination
  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/myst-dest/${id}`
        );
        const data = await response.json();

        if (response.ok) {
          setDestination(data);
        } else {
          setMsg(
            data.msg ||
              "Erreur lors de la récupération des détails de la destination."
          );
        }
      } catch (error) {
        console.error(error);
        setMsg("Erreur lors de la récupération des détails de la destination.");
      }
    };

    fetchDestination();
  }, [id]);

  // Validation du formulaire
  const validateForm = () => {
    const { startDate, endDate, numberAdult } = formReservation;

    // Conversion des dates de départ et de retour en objets Date
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    // Vérification que la date de départ soit au moins 7 jours après la date actuelle
    const oneWeekFromToday = new Date(today);
    oneWeekFromToday.setDate(today.getDate() + 7);

    if (start < oneWeekFromToday) {
      setMsg(
        "La réservation doit être effectuée au moins 1 semaine avant la date de départ afin de permettre à l'agence de préparer et organiser votre voyage dans les meilleures conditions."
      );
      return false;
    }

    // Vérification que la date de fin est après la date de début
    if (end <= start) {
      setMsg("La date de retour doit être après la date de départ.");
      return false;
    }

    // Vérification que la date de départ est dans le futur
    if (start <= today) {
      setMsg("La date de départ doit être dans le futur.");
      return false;
    }

    // Vérification que la durée du séjour respecte les min et max durées de la destination
    //1000 (nbre de millisec dans une sec) * 3600 (nbre de sec dans 1h : 60sec * 60min) * 24 (nbre d'h dans une journée)
    if (destination) {
      const durationInDays = (end - start) / (1000 * 3600 * 24) + 1;

      if (durationInDays < destination.minDuration) {
        setMsg(
          `La durée du séjour doit être d'au moins ${destination.minDuration} jours.`
        );
        return false;
      }

      if (durationInDays > destination.maxDuration) {
        setMsg(
          `La durée du séjour ne peut pas dépasser ${destination.maxDuration} jours.`
        );
        return false;
      }
    }

    // Validation que duration, budget, numberAdult et numberChild sont des nombres
    // if (isNaN(numberAdult) || isNaN(numberChild)) {
    //   setMsg(
    //     "Les champs 'nombre d'adultes' et 'nombre d'enfants' doivent être des nombres."
    //   );
    //   return false;
    // }

    // Vérification qu'il y a au moins un adulte
    if (numberAdult < 1) {
      setMsg("Il doit y avoir au moins un adulte.");
      return false;
    }

    if (!startDate || !endDate || !numberAdult) {
      setMsg("Tous les champs sont requis.");
      return false;
    }

    return true;
  };

  // Gérer les changements de champs de formulaire
  const handleChange = (e) => {
    setFormReservation({
      ...formReservation,
      [e.target.name]: e.target.value,
    });

    // On va seulement traiter la date modifiée : startDate ou endDate
    let start = new Date(formReservation.startDate);
    let end = new Date(formReservation.endDate);

    if (e.target.name === "startDate") {
      start = new Date(e.target.value);
    } else if (e.target.name === "endDate") {
      end = new Date(e.target.value);
    }

    // Calculer la différence en jours
    const durationInMilliseconds = end - start;

    // Calculer le nombre de jours
    const days = durationInMilliseconds / (1000 * 3600 * 24) + 1;

    // Si la durée est valide, mettez à jour les informations de durée et de budget
    if (days >= 0 && destination) {
      setNumberOfDays(days);
      const budget = days * destination.budget; // Calculer le budget basé sur le nombre de jours
      setCalculatedBudget(budget);
    } else {
      setNumberOfDays(0);
      setCalculatedBudget(0);
    }
  };

  // Gérer la soumission du formulaire
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Ne pas soumettre si le formulaire est invalide
    }

    // Ajout de user_id et mystDestination_id
    const reservationData = {
      ...formReservation,
      user_id: user.id, // Ajoute l'ID de l'utilisateur connecté
      mystDestination_id: id, // Ajoute l'ID de la destination depuis l'URL
    };

    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/myst-dest/${id}/reserve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(reservationData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setShowConfirmation(true); // Affiche la fenêtre de confirmation

        // Redirige après 15 sec
        setTimeout(() => {
          navigate(-1);
        }, 15000);
      } else {
        setMsg(data.msg);
      }
    } catch (error) {
      console.error(error);
      setMsg("Erreur lors de l'envoi de la réservation.");
    }
  };

  return (
    <main id="reservation">
      <button
        onClick={() => navigate(`/myst-destination/${id}`)}
        className="back"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Retour à la destination mystère
      </button>
      <h2>
        <FontAwesomeIcon icon={faCalendarCheck} /> Réserver votre voyage
      </h2>

      {showConfirmation ? (
        <div className="confirmation">
          <p>
            Votre demande de réservation a été confirmée avec succès !
            L'aventure Myst'Travel commence maintenant !
          </p>
          <p>
            L'agence reviendra vers vous par mail dans les plus brefs délais. À
            très bientôt pour l'aventure !
          </p>
          <p>Vous allez être redirigé vers la page de votre destination ...</p>
        </div>
      ) : (
        <>
          {destination && (
            <p>
              <span>
                Cette destination peut être réservée pour une durée de séjour
                entre {destination.minDuration} et {destination.maxDuration}{" "}
                jours.
              </span>
            </p>
          )}
          {msg && <p className="message">{msg}</p>}
          <form id="reservation-form" onSubmit={submitHandler}>
            <section className="date">
              <div>
                <label htmlFor="startDate">Date de début : </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  onChange={handleChange}
                  value={formReservation.startDate}
                />
              </div>
              <div>
                <label htmlFor="endDate">Date de fin : </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  onChange={handleChange}
                  value={formReservation.endDate}
                />
              </div>
            </section>
            <section className="people">
              <div>
                <label htmlFor="numberAdult">
                  Nombre d'adultes (à partir de 12 ans) :
                </label>
                <input
                  type="number"
                  id="numberAdult"
                  name="numberAdult"
                  onChange={handleChange}
                  value={formReservation.numberAdult}
                  min="1"
                  placeholder="Veuillez indiquer le nombre d'adulte"
                />
              </div>
              <div>
                <label htmlFor="numberChild">
                  Nombre d'enfants (moins de 12 ans) :
                </label>
                <input
                  type="number"
                  id="numberChild"
                  name="numberChild"
                  onChange={handleChange}
                  value={formReservation.numberChild}
                  min="0"
                  placeholder="Veuillez indiquer le nombre d'enfant"
                />
              </div>
            </section>

            {formReservation.startDate && formReservation.endDate && (
              <section>
                <h3>
                  <span>Durée sélectionnée :</span> {numberOfDays} jours
                </h3>
                <h3>
                  <span>Budget total estimé par personne :</span>{" "}
                  {calculatedBudget} €
                </h3>
                <p className="info-price">
                  Veuillez noter que les frais de transport aérien ne sont pas
                  inclus dans ce tarif et peuvent varier en fonction de votre
                  lieu de départ, de la saison, de la demande et des compagnies
                  aériennes sélectionnées. Réserver à l'avance peut contribuer à
                  réduire le coût total du transport.
                </p>
              </section>
            )}

            <button type="submit">Réserver</button>
          </form>
        </>
      )}
    </main>
  );
}

export default Reservation;
