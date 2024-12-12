import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../store/user/Context.jsx";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faSuitcaseRolling,
  faEarthAmericas,
  faTemperatureThreeQuarters,
  faMountainCity,
  faPersonRunning,
  faSackDollar,
  faCalendarDays,
  faHouse,
  faUtensils,
  faUser,
  faChild,
  faBan,
} from "@fortawesome/free-solid-svg-icons";

function CustTrip() {
  // useContext permet d'accéder au contexte User, contient la fonction user
  const { user } = useContext(LoginContext);
  // États pour stocker les données du formulaire
  const [formCustTrip, setFormCustTrip] = useState({
    typeExperience_id: "",
    duration: "",
    budget: "",
    climate_id: "",
    accomodation_id: "",
    activity_id: "",
    location_id: "",
    culture_id: "",
    numberAdult: "",
    numberChild: "",
    restriction: "",
    user_id: "",
  });
  // Etat pour stocker les options récupérées depuis l'API
  const [options, setOptions] = useState({
    typeExperience: [],
    climate: [],
    accomodation: [],
    activity: [],
    location: [],
    culture: [],
  });

  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Validation du formulaire
  const validateForm = () => {
    const {
      typeExperience_id,
      duration,
      budget,
      climate_id,
      accomodation_id,
      activity_id,
      location_id,
      culture_id,
      numberAdult,
      numberChild,
    } = formCustTrip;

    // Validation de tout les champs requis
    if (
      !typeExperience_id ||
      !duration ||
      !budget ||
      !climate_id ||
      !accomodation_id ||
      !activity_id ||
      !location_id ||
      !culture_id ||
      !numberAdult
    ) {
      setMsg("Tous les champs sont requis.");
      return false;
    }

    // Validation que la durée soit entre 2 et 21 jours
    if (duration < 2 || duration > 21) {
      setMsg("La durée doit être comprise entre 2 et 21 jours.");
      return false;
    }

    // Vérifier que le nombre d'adultes est au moins égal à 1
    if (numberAdult < 1) {
      setMsg("Il doit y avoir au moins un adulte.");
      return false;
    }

    // Vérifier si les champs numériques contiennent des valeurs valides
    if (
      isNaN(duration) ||
      isNaN(budget) ||
      isNaN(numberAdult) ||
      isNaN(numberChild)
    ) {
      setMsg("Veuillez entrer des chiffres valides pour les champs requis.");
      return false;
    }
    // Si tout est valide, on réinitialise le message d'erreur
    setMsg("");
    return true;
  };

  // useEffect pour charger les options depuis l'API quand le composant est monté
  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const response = await fetch(
          "http://localhost:9000/api/v1/customized-trip/choices",
          {
            // dans la requête on envoie les cookies pour que le serveur puisse s'en servir afin de vérifier l'état de connexion
            credentials: "include", // s'assurer que les cookies de session sont inclus
          }
        );
        const data = await response.json();
        setOptions({
          typeExperience: data.typeExperience || [],
          climate: data.climate || [],
          accomodation: data.accomodation || [],
          activity: data.activity || [],
          location: data.location || [],
          culture: data.culture || [],
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des choix :", error);
      }
    };

    fetchChoices();
  }, []);

  // Gérer les changements de champs de formulaire
  const handleChange = (e) => {
    setFormCustTrip({
      ...formCustTrip,
      [e.target.name]: e.target.value,
    });
  };

  // Gérer la soumission du formulaire
  const submitHandler = async (e) => {
    // Empêche le rechargement de la page lors de la soumission du formulaire
    e.preventDefault();

    if (!validateForm()) {
      // Ne pas soumettre si le formulaire est invalide
      return;
    }

    // Ajoute l'ID de l'utilisateur connecté au formulaire
    const formWithUser = {
      ...formCustTrip,
      user_id: user.id,
    };

    try {
      const response = await fetch(
        "http://localhost:9000/api/v1/customized-trip/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formWithUser),
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Affiche la fenêtre de confirmation
        setShowConfirmation(true);
        // Redirige après 15 sec
        setTimeout(() => {
          navigate("/");
        }, 15000);
      } else {
        setMsg(data.msg);
      }
    } catch (error) {
      setMsg(
        "Erreur lors de l'envoi de la demande de voyage sur-mesure. Veuillez réessayer plus tard."
      );
    }
  };

  return (
    <main
      id="cust-trip"
      aria-label="Page pour planifier une destination sur-mesure"
    >
      <nav
        className="menu-accessible"
        role="navigation"
        aria-label="Menu accessible avec tabulation"
      >
        <a href="#introduction-cust-trip">
          Présentation de la destination sur-mesure
        </a>
        <a href="#form-cust-trip">
          Formulaire pour planifier une destination sur-mesure
        </a>
      </nav>
      <h2>Planifiez votre destination sur-mesure</h2>
      {showConfirmation ? (
        <section
          className="container confirmation"
          role="status"
          aria-live="polite"
          aria-label="Message de confirmation de la demande de destination sur-mesure"
        >
          <FontAwesomeIcon icon={faCircleCheck} aria-hidden="true" />
          <p>
            <span>
              Votre demande de destination sur-mesure a été effectuée avec
              succès ! L'aventure Myst'Travel commence maintenant !
            </span>
          </p>
          <p>
            L'agence reviendra vers vous par mail dans les plus brefs délais
            pour obtenir plus d'informations et finaliser votre destination
            sur-mesure.
          </p>
          <p>À très bientôt pour l'aventure ! </p>
          <FontAwesomeIcon icon={faSuitcaseRolling} aria-hidden="true" />
          <p>Vous allez être redirigé vers la page d'accueil ...</p>
        </section>
      ) : (
        <section className="container">
          <div
            id="introduction-cust-trip"
            aria-label="Présentation de la destination sur-mesure"
          >
            <p>
              Notre formulaire est conçu pour mieux comprendre vos préférences
              de voyage et vous proposer une expérience unique, parfaitement
              adaptée à vos envies. Prenez quelques instants pour remplir les
              informations ci-dessous, et laissez-nous créer votre prochaine
              aventure mystère.
            </p>
            <p>
              <span>
                La durée des destinations sur-mesure doit être comprise entre 2
                et 21 jours.
              </span>
            </p>
            <p>
              <span>
                Les champs marqués par un astérisque (
                <span className="obligate">*</span>) sont requis pour finaliser
                votre demande.
              </span>
            </p>
            {msg && (
              <p className="message" role="alert">
                {msg}
              </p>
            )}
          </div>
          <form
            onSubmit={submitHandler}
            aria-label="Formulaire pour planifier une destination sur-mesure"
            id="form-cust-trip"
          >
            <div className="question">
              <FontAwesomeIcon icon={faCalendarDays} aria-hidden="true" />
              <div>
                <label htmlFor="duration">
                  Quelle est la durée de votre séjour idéal ?{" "}
                  <span className="obligate">*</span>
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  onChange={handleChange}
                  value={formCustTrip.duration}
                  min="2"
                  max="21"
                  placeholder="Veuillez indiquer le nombre de jours"
                  required
                />
              </div>
            </div>
            <div className="question">
              <FontAwesomeIcon icon={faSackDollar} aria-hidden="true" />
              <div>
                <label htmlFor="budget">
                  Quel est votre budget total par personne ?{" "}
                  <span className="obligate">*</span>
                </label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  onChange={handleChange}
                  value={formCustTrip.budget}
                  placeholder="Veuillez indiquer votre budget maximal"
                  required
                />
              </div>
            </div>
            <div className="question">
              <FontAwesomeIcon icon={faEarthAmericas} aria-hidden="true" />
              <div>
                <label htmlFor="location">
                  Quelle région du monde vous attire le plus ?{" "}
                  <span className="obligate">*</span>
                </label>
                <select
                  id="location"
                  name="location_id"
                  onChange={handleChange}
                  value={formCustTrip.location_id}
                  required
                >
                  <option value="">Choisissez une option</option>
                  {options.location.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.choice}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="question">
              <FontAwesomeIcon icon={faMountainCity} aria-hidden="true" />
              <div>
                <label htmlFor="typeExperience">
                  Quelle expérience recherchez-vous ?{" "}
                  <span className="obligate">*</span>
                </label>
                <select
                  id="typeExperience"
                  name="typeExperience_id"
                  onChange={handleChange}
                  value={formCustTrip.typeExperience_id}
                  required
                >
                  <option value="">Choisissez une option</option>
                  {options.typeExperience.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.choice}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="question">
              <FontAwesomeIcon
                icon={faTemperatureThreeQuarters}
                aria-hidden="true"
              />
              <div>
                <label htmlFor="climate">
                  Quel climat préférez-vous ?{" "}
                  <span className="obligate">*</span>
                </label>
                <select
                  id="climate"
                  name="climate_id"
                  onChange={handleChange}
                  value={formCustTrip.climate_id}
                  required
                >
                  <option value="">Choisissez une option</option>
                  {options.climate.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.choice}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="question">
              <FontAwesomeIcon icon={faHouse} aria-hidden="true" />
              <div>
                <label htmlFor="accomodation">
                  Quel hébergement préférez-vous ?{" "}
                  <span className="obligate">*</span>
                </label>
                <select
                  id="accomodation"
                  name="accomodation_id"
                  onChange={handleChange}
                  value={formCustTrip.accomodation_id}
                  required
                >
                  <option value="">Choisissez une option</option>
                  {options.accomodation.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.choice}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="question">
              <FontAwesomeIcon icon={faPersonRunning} aria-hidden="true" />
              <div>
                <label htmlFor="activity">
                  {" "}
                  Quel niveau d'activité souhaitez-vous ?{" "}
                  <span className="obligate">*</span>
                </label>
                <select
                  id="activity"
                  name="activity_id"
                  onChange={handleChange}
                  value={formCustTrip.activity_id}
                  required
                >
                  <option value="">Choisissez une option</option>
                  {options.activity.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.choice}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="question">
              <FontAwesomeIcon icon={faUtensils} aria-hidden="true" />
              <div>
                <label htmlFor="culture">
                  Quelle est l’importance de la gastronomie et de la culture
                  locale ? <span className="obligate">*</span>
                </label>
                <select
                  id="culture"
                  name="culture_id"
                  onChange={handleChange}
                  value={formCustTrip.culture_id}
                  required
                >
                  <option value="">Choisissez une option</option>
                  {options.culture.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.choice}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="question">
              <FontAwesomeIcon icon={faUser} aria-hidden="true" />
              <div>
                <label htmlFor="numberAdult">
                  Combien d'adultes (à partir de 12 ans) participent au voyage ?{" "}
                  <span className="obligate">*</span>
                </label>
                <input
                  type="number"
                  id="numberAdult"
                  name="numberAdult"
                  onChange={handleChange}
                  value={formCustTrip.numberAdult}
                  min="1"
                  placeholder="Veuillez indiquer le nombre d'adulte"
                  required
                />
              </div>
            </div>
            <div className="question">
              <FontAwesomeIcon icon={faChild} aria-hidden="true" />
              <div>
                <label htmlFor="numberChild">
                  Combien d'enfants (moins de 12 ans) ?
                </label>
                <input
                  type="number"
                  id="numberChild"
                  name="numberChild"
                  onChange={handleChange}
                  value={formCustTrip.numberChild}
                  min="0"
                  placeholder="Veuillez indiquer le nombre d'enfant"
                />
              </div>
            </div>
            <div className="question">
              <FontAwesomeIcon icon={faBan} aria-hidden="true" />
              <div>
                <label htmlFor="restriction">
                  Avez-vous des restrictions spécifiques pour le voyage ?
                </label>
                <input
                  type="text"
                  id="restriction"
                  name="restriction"
                  onChange={handleChange}
                  value={formCustTrip.restriction}
                  placeholder="Veuillez indiquer vos restrictions"
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={scrollToTop}
              aria-label="Envoyer votre demande pour une destination sur-mesure"
            >
              Envoyer
            </button>
          </form>
        </section>
      )}
    </main>
  );
}

export default CustTrip;
