import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateMystDest() {
  const { id } = useParams(); // Récupérer l'ID de la destination via l'URL

  const [mystDest, setMystDest] = useState({
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
  // Pour gérer les messages de retour
  const [msg, setMsg] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Récupérer la destination existante
  useEffect(() => {
    const fetchMystDest = async () => {
      const response = await fetch(
        `http://localhost:9000/api/v1/myst-dest/${id}`
      );
      const data = await response.json();
      setMystDest(data);
    };

    fetchMystDest();
  }, [id]);

  const handleChange = (e) => {
    setMystDest({
      ...mystDest,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setMystDest({
      ...mystDest,
      image: e.target.files[0], // On récupère le fichier image
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const budget = parseFloat(mystDest.budget);
    const minDuration = Number(mystDest.minDuration);
    const maxDuration = Number(mystDest.maxDuration);

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
    } = mystDest;

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
      return; // Arrêter la soumission du formulaire si la validation échoue
    }

    // Validation : vérifier que maxDuration est supérieur à minDuration
    if (maxDuration <= minDuration) {
      setMsg("La durée maximale doit être supérieure à la durée minimale.");
      return; // Arrêter la soumission du formulaire si la validation échoue
    }

    const formData = new FormData();
    // Utilisation d'une boucle pour ajouter tous les champs au FormData
    for (const key in mystDest) {
      // Assurez-vous de ne pas ajouter des champs non voulus (par exemple, les champs vides ou l'image si elle n'est pas sélectionnée)
      if (mystDest[key] || key === "image") {
        formData.append(key, mystDest[key]);
      }
    }

    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/myst-dest/update/${id}`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
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
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  return (
    <main>
      <button
        onClick={() => navigate("/dashboard/myst-destination")}
        title="Retour à la page du dashboard"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </button>
      <h2>Modifier la destination mystère</h2>
      {showConfirmation ? (
        <div className="confirmation-popup">
          <p>La destination a bien été modifiée !</p>
          <p>
            Vous allez être redirigé vers la page de toutes les destinations ...
          </p>
        </div>
      ) : (
        <>
          {msg && <p className="message">{msg}</p>}
          <form onSubmit={submitHandler}>
            <label htmlFor="title">Titre de la destination</label>
            <input
              type="text"
              id="title"
              name="title"
              value={mystDest.title}
              onChange={handleChange}
              required
            />

            <label htmlFor="locationClue">
              Indice n°1 : La région géographique
            </label>
            <textarea
              type="text"
              name="locationClue"
              value={mystDest.locationClue}
              onChange={handleChange}
              required
            ></textarea>

            <label htmlFor="continent">Continent</label>
            <select
              type="text"
              id="continent"
              name="continent"
              value={mystDest.continent}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez un continent</option>
              <option value="Europe">Europe</option>
              <option value="Amérique">Amérique</option>
              <option value="Asie">Asie</option>
              <option value="Afrique">Afrique</option>
              <option value="Océanie">Océanie</option>
            </select>

            <label htmlFor="climateClue">Indice n°2 : Le climat</label>
            <textarea
              type="text"
              name="climateClue"
              value={mystDest.climateClue}
              onChange={handleChange}
              required
            ></textarea>

            <label htmlFor="climate">Climat</label>
            <select
              type="text"
              id="climate"
              name="climate"
              value={mystDest.climate}
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
              Indice n°3 : Le type d'expérience
            </label>
            <textarea
              type="text"
              name="experienceClue"
              value={mystDest.experienceClue}
              onChange={handleChange}
              required
            ></textarea>
            <label htmlFor="accomodation">Type d'hébergement</label>
            <select
              type="text"
              id="accomodation"
              name="accomodation"
              value={mystDest.accomodation}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez le type d'hébergement</option>
              <option value="Classique et Confortable">
                Classique et Confortable
              </option>
              <option value="Nature et Authentique">
                Nature et Authentique
              </option>
              <option value="Économique et Pratique">
                Économique et Pratique
              </option>
              <option value="Séjour multi-hébergements">
                Séjour multi-hébergements
              </option>
            </select>

            <label htmlFor="activityClue">
              Indice n°4 : Le niveau d’activité physique
            </label>
            <textarea
              type="text"
              name="activityClue"
              value={mystDest.activityClue}
              onChange={handleChange}
              required
            ></textarea>
            <label htmlFor="activity">Activité</label>
            <select
              type="text"
              id="activity"
              name="activity"
              value={mystDest.activity}
              onChange={handleChange}
              required
            >
              <option value="">
                Sélectionnez un niveau d'activité physique
              </option>
              <option value="Relax">Relax</option>
              <option value="Modéré">Modéré</option>
              <option value="Dynamique">Dynamique</option>
              <option value="Intensif">Intensif</option>
              <option value="Aventureux">Aventureux</option>
            </select>

            <label htmlFor="budget">Budget par jour/personne (en €)</label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={mystDest.budget}
              onChange={handleChange}
              required
            />

            <label htmlFor="minDuration">Durée minimale (en jours)</label>
            <input
              type="number"
              id="minDuration"
              name="minDuration"
              min="2"
              max="21"
              value={mystDest.minDuration}
              onChange={handleChange}
              required
            />
            <label htmlFor="maxDuration">Durée maximale (en jours)</label>
            <input
              type="number"
              id="maxDuration"
              name="maxDuration"
              min={mystDest.minDuration}
              max="21"
              value={mystDest.maxDuration}
              onChange={handleChange}
              required
            />

            <label htmlFor="image">
              L'image (extensions autorisées : .png, .jpg, .jpeg, .webp ;
              privilégier l'extension .webp pour un format d'image optimisé ;
              taille maximale de l'image : 2 Mo)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
            />

            <label htmlFor="alt">La description de l'image</label>
            <input
              type="text"
              id="alt"
              name="alt"
              value={mystDest.alt}
              onChange={handleChange}
              required
            />

            <button type="submit">Mettre à jour la destination</button>
          </form>
        </>
      )}
    </main>
  );
}

export default UpdateMystDest;
