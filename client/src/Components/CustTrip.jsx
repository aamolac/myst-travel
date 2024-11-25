import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../store/user/Context.jsx";
import { useNavigate } from "react-router-dom";

function CustTrip() {
  // Récupère les informations utilisateur depuis le contexte
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

  // Pour stocker les options récupérées depuis l'API
  const [options, setOptions] = useState({
    typeExperience: [],
    climate: [],
    accomodation: [],
    activity: [],
    location: [],
    culture: [],
  });

  const navigate = useNavigate();
  // Pour gérer les messages de retour
  const [msg, setMsg] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

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
      setMsg("La durée doit être comrpise entre 2 et 21 jours.");
      return false;
    }

    // Vérifier que le nombre d'adultes est au moins égal à 1
    if (numberAdult < 1) {
      setMsg("Il doit y avoir au moins un adulte.");
      return false;
    }

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
    e.preventDefault();

    if (!validateForm()) {
      return; // Ne pas soumettre si le formulaire est invalide
    }

    // Ajoute l'user_id au formulaire
    const formWithUser = {
      ...formCustTrip,
      user_id: user.id, // Ajoute l'ID de l'utilisateur connecté
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
        setShowConfirmation(true); // Affiche la fenêtre de confirmation

        // Redirige après 15 sec
        setTimeout(() => {
          navigate("/");
        }, 15000);
      } else {
        setMsg(data.msg); // Affiche le message d'erreur renvoyé par le serveur
      }
    } catch (error) {
      setMsg("Erreur lors de l'envoi de la demande.");
    }
  };

  return (
    <main id="cust-trip">
      <h2>Planifiez votre destination sur-mesure</h2>
      {showConfirmation ? (
        <div className="confirmation-popup">
          <p>
            Votre demande de destination sur-mesure a été effectuée avec succès
            ! L'aventure Myst'Travel commence maintenant !
          </p>
          <p>
            L'agence reviendra vers vous par mail dans les plus brefs délais
            pour obtenir plus d'informations et finaliser votre destination
            sur-mesure. À très bientôt pour l'aventure !
          </p>
          <p>Vous allez être redirigé vers la page d'accueil ...</p>
        </div>
      ) : (
        <>
          <p>
            Notre formulaire est conçu pour mieux comprendre vos préférences de
            voyage et vous proposer une expérience unique, parfaitement adaptée
            à vos envies. Prenez quelques instants pour remplir les informations
            ci-dessous, et laissez-nous créer votre prochaine aventure mystère.
          </p>
          <p>
            <span>
              La durée des destinations sur-mesure doit être comprise entre 2 et
              21 jours.
            </span>
          </p>
          {msg && <p className="message">{msg}</p>}
          <form id="cust-trip" onSubmit={submitHandler}>
            <label htmlFor="typeExperience">
              Quel type d'expérience recherchez-vous ?
            </label>
            <select
              id="typeExperience"
              name="typeExperience_id"
              onChange={handleChange}
              value={formCustTrip.typeExperience_id}
            >
              <option value="">Choisissez une option</option>
              {options.typeExperience.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.choice}
                </option>
              ))}
            </select>
            <label htmlFor="duration">
              Quelle est la durée de votre séjour idéal ?
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              onChange={handleChange}
              value={formCustTrip.duration}
              min="2"
              max="21"
              placeholder="Veuillez indiquer le nombre de jours souhaités"
            />
            <label htmlFor="budget">
              Quel est votre budget total pour ce voyage, par personne ?
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              onChange={handleChange}
              value={formCustTrip.budget}
              placeholder="Veuillez indiquer votre budget maximal par personne"
            />
            <label htmlFor="climate">Quel type de climat préférez-vous ?</label>
            <select
              id="climate"
              name="climate_id"
              onChange={handleChange}
              value={formCustTrip.climate_id}
            >
              <option value="">Choisissez une option</option>
              {options.climate.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.choice}
                </option>
              ))}
            </select>
            <label htmlFor="accomodation">
              Quel type d’hébergement préférez-vous ?
            </label>
            <select
              id="accomodation"
              name="accomodation_id"
              onChange={handleChange}
              value={formCustTrip.accomodation_id}
            >
              <option value="">Choisissez une option</option>
              {options.accomodation.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.choice}
                </option>
              ))}
            </select>
            <label htmlFor="activity">
              Quel niveau d'activité souhaitez-vous pour ce voyage ?
            </label>
            <select
              id="activity"
              name="activity_id"
              onChange={handleChange}
              value={formCustTrip.activity_id}
            >
              <option value="">Choisissez une option</option>
              {options.activity.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.choice}
                </option>
              ))}
            </select>
            <label htmlFor="location">
              Quelle région du monde vous attire le plus ?
            </label>
            <select
              id="location"
              name="location_id"
              onChange={handleChange}
              value={formCustTrip.location_id}
            >
              <option value="">Choisissez une option</option>
              {options.location.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.choice}
                </option>
              ))}
            </select>
            <label htmlFor="culture">
              Quelle est l’importance de la gastronomie et de la culture locale
              dans votre voyage ?
            </label>
            <select
              id="culture"
              name="culture_id"
              onChange={handleChange}
              value={formCustTrip.culture_id}
            >
              <option value="">Choisissez une option</option>
              {options.culture.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.choice}
                </option>
              ))}
            </select>
            <label htmlFor="numberAdult">
              Combien d'adultes (à partir de 12 ans) participent au voyage ?
            </label>
            <input
              type="number"
              id="numberAdult"
              name="numberAdult"
              onChange={handleChange}
              value={formCustTrip.numberAdult}
              min="1"
              placeholder="Veuillez indiquer le nombre d'adulte (à partir de 12 ans)"
            />
            <label htmlFor="numberChild">
              Combien d'enfants (moins de 12 ans) participent au voyage ?
            </label>
            <input
              type="number"
              id="numberChild"
              name="numberChild"
              onChange={handleChange}
              value={formCustTrip.numberChild}
              min="0"
              placeholder="Veuillez indiquer le nombre d'enfant (moins de 12 ans)"
            />

            <label htmlFor="restriction">
              Avez-vous des restrictions spécifiques pour le voyage mystère ?
            </label>
            <input
              type="text"
              id="restriction"
              name="restriction"
              onChange={handleChange}
              value={formCustTrip.restriction}
            />
            <button type="submit">Envoyer</button>
          </form>
        </>
      )}
    </main>
  );
}

export default CustTrip;
