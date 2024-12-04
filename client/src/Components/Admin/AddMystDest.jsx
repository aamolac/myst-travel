import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEarthAmericas,
  faTemperatureThreeQuarters,
  faMountainCity,
  faPersonRunning,
  faSackDollar,
  faCalendarDays,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddMystDest() {
  // États pour stocker les données du formulaire
  const [formMystDest, setFormMystDest] = useState({
    title: "",
    climateClue: "",
    climate: "",
    experienceClue: "",
    accomodation: "",
    activityClue: "",
    activity: "",
    locationClue: "",
    continent: "",
    budget: "",
    minDuration: "",
    maxDuration: "",
    image: null,
    alt: "",
  });

  const navigate = useNavigate();
  // Pour gérer les messages de retour
  const [msg, setMsg] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Défiler en haut de la page
  };

  // Validation du formulaire
  const validateForm = () => {
    const budget = parseFloat(formMystDest.budget);
    const minDuration = Number(formMystDest.minDuration);
    const maxDuration = Number(formMystDest.maxDuration);

    const {
      title,
      climateClue,
      climate,
      experienceClue,
      accomodation,
      activityClue,
      activity,
      locationClue,
      continent,
      image,
      alt,
    } = formMystDest;

    // Validation de tout les champs requis
    if (
      !title ||
      !climateClue ||
      !climate ||
      !experienceClue ||
      !accomodation ||
      !activityClue ||
      !activity ||
      !locationClue ||
      !continent ||
      !budget ||
      !minDuration ||
      !maxDuration ||
      !image ||
      !alt
    ) {
      setMsg("Tous les champs sont requis.");
      return false;
    }

    // Validation : vérifier que les durées sont comprises entre 2 et 21 jours
    if (
      minDuration < 2 ||
      minDuration > 21 ||
      maxDuration < 2 ||
      maxDuration > 21
    ) {
      setMsg("Les durées doivent être comprises entre 2 et 21 jours.");
      return false;
    }

    // Vérifier que la durée maximale est supérieure à la durée minimale
    if (minDuration >= maxDuration) {
      setMsg("La durée maximale doit être supérieure à la durée minimale.");
      return false;
    }

    return true;
  };

  // Gérer les changements de champs de formulaire
  const handleChange = (e) => {
    setFormMystDest({
      ...formMystDest,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormMystDest({
      ...formMystDest,
      image: e.target.files[0], // Assurez-vous que vous prenez le bon fichier
    });
  };

  // Gérer la soumission du formulaire
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Ne pas soumettre si le formulaire est invalide
    }

    try {
      // Créez une instance de FormData
      const formData = new FormData();

      // Ajoutez tous les champs de votre état au FormData
      for (const key in formMystDest) {
        formData.append(key, formMystDest[key]);
      }

      const response = await fetch(
        "http://localhost:9000/api/v1/myst-dest/add",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setShowConfirmation(true); // Affiche la fenêtre de confirmation

        // Redirige après 5 sec
        setTimeout(() => {
          navigate("/dashboard/myst-destination");
        }, 5000);
      } else {
        setMsg(data.msg);
      }
    } catch (error) {
      setMsg("Erreur lors de l'ajout de la destination mystère.");
    }
  };

  return (
    <main className="container add-myst-dest">
      <button
        onClick={() => navigate("/dashboard/myst-destination")}
        title="Retour à la page des destinations mystères"
        className="back"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </button>
      <h2>Ajout d'une destination mystère</h2>
      {showConfirmation ? (
        <section className="confirmation">
          <FontAwesomeIcon icon={faCircleCheck} />
          <p>La destination a bien été ajoutée !</p>
          <p>
            Vous allez être redirigé vers la page de toutes les destinations ...
          </p>
        </section>
      ) : (
        <form onSubmit={submitHandler}>
          {msg && <p className="message">{msg}</p>}
          <label htmlFor="title">Titre de la destination</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            value={formMystDest.title}
            placeholder="Entrer le titre"
            required
          />
          <label htmlFor="locationClue">
            <FontAwesomeIcon icon={faEarthAmericas} /> Indice n°1 : La région
            géographique
          </label>
          <textarea
            id="locationClue"
            name="locationClue"
            placeholder="Entrer les informations de la zone géographique"
            value={formMystDest.locationClue}
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="continent">Continent</label>
          <select
            id="continent"
            name="continent"
            value={formMystDest.continent}
            onChange={handleChange}
            required
          >
            <option value="">Choisir le continent</option>
            <option value="Europe">Europe</option>
            <option value="Amérique">Amérique</option>
            <option value="Asie">Asie</option>
            <option value="Afrique">Afrique</option>
            <option value="Océanie">Océanie</option>
          </select>
          <label htmlFor="climateClue">
            <FontAwesomeIcon icon={faTemperatureThreeQuarters} /> Indice n°2 :
            Le climat
          </label>
          <textarea
            id="climateClue"
            name="climateClue"
            placeholder="Entrer les informations du climat"
            value={formMystDest.climateClue}
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="climate">Climat</label>
          <select
            id="climate"
            name="climate"
            value={formMystDest.climate}
            onChange={handleChange}
            required
          >
            <option value="">Choisir le climat</option>
            <option value="Chaud et ensoleillé">Chaud et ensoleillé</option>
            <option value="Tempéré et doux">Tempéré et doux</option>
            <option value="Frais">Frais</option>
            <option value="Humide">Humide</option>
            <option value="Hivernal">Hivernal</option>
          </select>
          <label htmlFor="experienceClue">
            <FontAwesomeIcon icon={faMountainCity} /> Indice n°3 : Le type
            d'expérience
          </label>
          <textarea
            id="experienceClue"
            name="experienceClue"
            placeholder="Entrer les informations du type d'expérience"
            value={formMystDest.experienceClue}
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="accomodation">Type d'expérience</label>
          <select
            id="accomodation"
            name="accomodation"
            value={formMystDest.accomodation}
            onChange={handleChange}
            required
          >
            <option value="">Choisir le type d'hébergement</option>
            <option value="Classique et Confortable">
              Classique et Confortable
            </option>
            <option value="Nature et Authentique">Nature et Authentique</option>
            <option value="Économique et Pratique">
              Économique et Pratique
            </option>
            <option value="Multi-hébergements">Multi-hébergements</option>
          </select>
          <label htmlFor="activityClue">
            <FontAwesomeIcon icon={faPersonRunning} /> Indice n°4 : Le niveau
            d’activité physique
          </label>
          <textarea
            id="activityClue"
            name="activityClue"
            placeholder="Entrer les informations du niveau d'activité"
            value={formMystDest.activityClue}
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="activity">Activité</label>
          <select
            id="activity"
            name="activity"
            value={formMystDest.activity}
            onChange={handleChange}
            required
          >
            <option value="">Choisir le niveau d'activité physique</option>
            <option value="Relax">Relax</option>
            <option value="Modéré">Modéré</option>
            <option value="Dynamique">Dynamique</option>
            <option value="Intensif">Intensif</option>
            <option value="Aventureux">Aventureux</option>
          </select>

          <label htmlFor="budget">
            <FontAwesomeIcon icon={faSackDollar} /> Budget par jour/personne (en
            €)
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            onChange={handleChange}
            value={formMystDest.budget}
            placeholder="Entrer le budget en € par jour/personne"
            required
          />
          <label htmlFor="minDuration">
            <FontAwesomeIcon icon={faCalendarDays} /> Durée minimale (en jours)
          </label>
          <input
            type="number"
            id="minDuration"
            name="minDuration"
            min="2"
            max="21"
            onChange={handleChange}
            value={formMystDest.minDuration}
            placeholder="Entrer la durée minimale"
            required
          />
          <label htmlFor="maxDuration">
            <FontAwesomeIcon icon={faCalendarDays} /> Durée maximale (en jours)
          </label>
          <input
            type="number"
            id="maxDuration"
            name="maxDuration"
            min={formMystDest.minDuration}
            max="21"
            onChange={handleChange}
            value={formMystDest.maxDuration}
            placeholder="Entrer la durée maximale"
            required
          />
          <label htmlFor="image">L'image</label>
          <p>
            Les extensions autorisées sont :{" "}
            <span>.png, .jpg, .jpeg, .webp.</span> Il faut privilégier
            l'extension <span>.webp</span> pour un format d'image optimisé. La
            taille maximale de l'image es de <span>2 Mo</span>.
          </p>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <label htmlFor="alt">La description de l'image</label>
          <input
            type="text"
            id="alt"
            name="alt"
            onChange={handleChange}
            value={formMystDest.alt}
            placeholder="Entrer la description de l'image"
            required
          />

          <button type="submit" onClick={scrollToTop}>
            Ajouter la destination mystère
          </button>
        </form>
      )}
    </main>
  );
}

export default AddMystDest;
