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
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateMystDest() {
  // Récupérer l'ID de la destination via l'URL
  const { id } = useParams();

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
    image: "",
    alt: "",
  });

  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Validation du formulaire
  const validateForm = () => {
    // Conversion des champs en nombres
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
      // Arrêter la soumission du formulaire si la validation échoue
      return false;
    }

    // Vérifier si les champs numériques contiennent des valeurs valides
    if (isNaN(budget) || isNaN(minDuration) || isNaN(maxDuration)) {
      setMsg("Veuillez entrer des chiffres valides pour les champs requis.");
      // Arrêter la soumission du formulaire si la validation échoue
      return false;
    }

    // Vérifier que les durées sont comprises entre 2 et 21 jours
    if (
      minDuration < 2 ||
      minDuration > 21 ||
      maxDuration < 2 ||
      maxDuration > 21
    ) {
      setMsg("Les durées doivent être comprises entre 2 et 21 jours.");
      // Arrêter la soumission du formulaire si la validation échoue
      return;
    }
    // Vérifier que maxDuration est supérieur à minDuration
    if (maxDuration <= minDuration) {
      setMsg("La durée maximale doit être supérieure à la durée minimale.");
      // Arrêter la soumission du formulaire si la validation échoue
      return;
    }
    // Si tout est valide, on réinitialise le message d'erreur
    setMsg("");
    return true;
  };

  // Met à jour le titre à chaque fois que l'id change
  useEffect(() => {
    document.title = `Modifier la destination mystère #${id} - Myst'Travel`;
  }, [id]);

  // Récupérer la destination existante
  useEffect(() => {
    const fetchMystDest = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/myst-dest/${id}`
        );
        const data = await response.json();
        setFormMystDest(data);
      } catch (error) {
        setMsg("Erreur lors de l'affichage de la destination mystère");
      }
    };
    fetchMystDest();
  }, [id]);

  // Gérer les changements de champs de formulaire
  const handleChange = (e) => {
    setFormMystDest({
      ...formMystDest,
      [e.target.name]: e.target.value,
    });
  };

  // Gérer les changements de l'image
  const handleFileChange = (e) => {
    setFormMystDest({
      ...formMystDest,
      image: e.target.files[0],
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

    try {
      const formData = new FormData();
      // Ajouter tous les champs au FormData
      for (const key in formMystDest) {
        // Ne pas ajouter des champs non voulus (l'image si pas sélectionnée)
        if (formMystDest[key] || key === "image") {
          formData.append(key, formMystDest[key]);
        }
      }

      const response = await fetch(
        `http://localhost:9000/api/v1/myst-dest/update/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Affiche la fenêtre de confirmation
        setShowConfirmation(true);
        // Redirige après 5 sec
        setTimeout(() => {
          navigate("/dashboard/myst-destination");
        }, 5000);
      } else {
        setMsg(data.msg);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la destination mystère");
    }
  };

  return (
    <main
      className="container update-myst-dest"
      aria-label="Page pour modifier une destination mystère"
    >
      <button
        onClick={() => navigate("/dashboard/myst-destination")}
        title="Retour à la page des destinations mystères"
        className="back"
        aria-label="Retour à la page des destinations mystères"
      >
        <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" /> Retour
      </button>
      <h2>Modifier la destination mystère</h2>
      {showConfirmation ? (
        <section
          className="confirmation"
          aria-live="polite"
          aria-label="Message de confirmation de la modification d'une destination mystère"
        >
          <FontAwesomeIcon icon={faCircleCheck} aria-hidden="true" />
          <p>
            <span>La destination a bien été modifiée !</span>
          </p>
          <p>
            Vous allez être redirigé vers la page de toutes les destinations ...
          </p>
        </section>
      ) : (
        <form
          onSubmit={submitHandler}
          aria-label="Formulaire pour modifier la destination mystère"
        >
          {msg && (
            <p className="message" role="alert">
              {msg}
            </p>
          )}
          <label htmlFor="title">Titre de la destination</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formMystDest.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="locationClue">
            <FontAwesomeIcon icon={faEarthAmericas} aria-hidden="true" /> Indice
            n°1 : La région géographique
          </label>
          <textarea
            id="locationClue"
            name="locationClue"
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
            <FontAwesomeIcon
              icon={faTemperatureThreeQuarters}
              aria-hidden="true"
            />{" "}
            Indice n°2 : Le climat
          </label>
          <textarea
            id="climateClue"
            name="climateClue"
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
            <FontAwesomeIcon icon={faMountainCity} aria-hidden="true" /> Indice
            n°3 : Le type d'expérience
          </label>
          <textarea
            id="experienceClue"
            name="experienceClue"
            value={formMystDest.experienceClue}
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="accomodation">Type d'hébergement</label>
          <select
            id="accomodation"
            name="accomodation"
            value={formMystDest.accomodation}
            onChange={handleChange}
            required
          >
            <option value="">Choisir le type d'hébergement</option>
            <option value="Classique et confortable">
              Classique et confortable
            </option>
            <option value="Nature et authentique">Nature et authentique</option>
            <option value="Économique et pratique">
              Économique et pratique
            </option>
            <option value="Multi-hébergements">Multi-hébergements</option>
          </select>

          <label htmlFor="activityClue">
            <FontAwesomeIcon icon={faPersonRunning} aria-hidden="true" /> Indice
            n°4 : Le niveau d’activité physique
          </label>
          <textarea
            id="activityClue"
            name="activityClue"
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
            <FontAwesomeIcon icon={faSackDollar} aria-hidden="true" /> Budget
            par jour/personne (en €)
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formMystDest.budget}
            onChange={handleChange}
            required
          />

          <label htmlFor="minDuration">
            <FontAwesomeIcon icon={faCalendarDays} aria-hidden="true" /> Durée
            minimale (en jours)
          </label>
          <input
            type="number"
            id="minDuration"
            name="minDuration"
            min="2"
            max="21"
            value={formMystDest.minDuration}
            onChange={handleChange}
            required
          />
          <label htmlFor="maxDuration">
            <FontAwesomeIcon icon={faCalendarDays} aria-hidden="true" /> Durée
            maximale (en jours)
          </label>
          <input
            type="number"
            id="maxDuration"
            name="maxDuration"
            min={formMystDest.minDuration}
            max="21"
            value={formMystDest.maxDuration}
            onChange={handleChange}
            required
          />

          <label htmlFor="image">
            <FontAwesomeIcon icon={faImage} aria-hidden="true" /> L'image
          </label>
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
            onChange={handleFileChange}
          />

          <label htmlFor="alt">La description de l'image</label>
          <input
            type="text"
            id="alt"
            name="alt"
            value={formMystDest.alt}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            onClick={scrollToTop}
            aria-label="Valider la modification de la destination mystère"
          >
            Mettre à jour la destination
          </button>
        </form>
      )}
    </main>
  );
}

export default UpdateMystDest;
