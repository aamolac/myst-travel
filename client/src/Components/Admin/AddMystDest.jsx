import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddMystDest() {
  // États pour stocker les données du formulaire
  const [formMystDest, setFormMystDest] = useState({
    title: "",
    climate: "",
    experience: "",
    activity: "",
    location: "",
    budget: "",
    recoDuration: "",
    image: null,
    alt: "",
  });

  const navigate = useNavigate();
  // Pour gérer les messages de retour
  const [msg, setMsg] = useState("");

  // Validation du formulaire
  const validateForm = () => {
    const {
      title,
      climate,
      experience,
      activity,
      location,
      budget,
      recoDuration,
      image,
      alt,
    } = formMystDest;

    // Validation de tout les champs requis
    if (
      !title ||
      !climate ||
      !experience ||
      !activity ||
      !location ||
      !budget ||
      !recoDuration ||
      !image ||
      !alt
    ) {
      setMsg("Tous les champs sont requis.");
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
        setMsg(data.msg); // Affiche le message de succès
      } else {
        setMsg(data.msg); // Affiche le message d'erreur renvoyé par le serveur
      }
    } catch (error) {
      setMsg("Erreur lors de l'ajout de la destination mystère.");
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
      <h2>Ajout d'une destination mystère</h2>
      <section>
        {msg && <p>{msg}</p>}
        <form onSubmit={submitHandler}>
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
          <label htmlFor="climate">Indice n°1 : Le climat</label>
          <textarea
            name="climate"
            placeholder="Entrer les informations du climat"
            value={formMystDest.climate}
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="experience">Indice n°2 : Le Type d'Expérience</label>
          <textarea
            name="experience"
            placeholder="Entrer les informations du type d'expérience"
            value={formMystDest.experience}
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="activity">
            Indice n°3 : Le Niveau d’Activité Physique
          </label>
          <textarea
            name="activity"
            placeholder="Entrer les informations du niveau d'activité"
            value={formMystDest.activity}
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="location">Indice n°4 : La Région Géographique</label>
          <textarea
            name="location"
            placeholder="Entrer les informations de la zone géographique"
            value={formMystDest.location}
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="budget">Budget par personne</label>
          <input
            type="number"
            id="budget"
            name="budget"
            onChange={handleChange}
            value={formMystDest.budget}
            placeholder="Entrer le budget en € par personne"
          />
          <label htmlFor="recoDuration">Durée recommandée</label>
          <input
            type="number"
            id="recoDuration"
            name="recoDuration"
            onChange={handleChange}
            value={formMystDest.recoDuration}
            placeholder="Entrer la durée recommandée"
          />
          <label htmlFor="image">
            L'image (extensions autorisées : .png, .jpg, .jpeg, .webp ; taille
            maximale de l'image : 2 Mo)
          </label>
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

          <button type="submit">Ajouter la destination mystère</button>
        </form>
      </section>
    </main>
  );
}

export default AddMystDest;
