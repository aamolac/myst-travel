import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateMystDest() {
  const { id } = useParams(); // Récupérer l'ID de la destination via l'URL
  const navigate = useNavigate();
  // Pour gérer les messages de retour
  const [msg, setMsg] = useState("");

  const [mystDest, setMystDest] = useState({
    title: "",
    climate: "",
    experience: "",
    activity: "",
    location: "",
    budget: "",
    recoDuration: "",
    image: "",
    alt: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Utilisation d'une boucle pour ajouter tous les champs au FormData
    for (const key in mystDest) {
      // Assurez-vous de ne pas ajouter des champs non voulus (par exemple, les champs vides ou l'image si elle n'est pas sélectionnée)
      if (mystDest[key] || key === "image") {
        formData.append(key, mystDest[key]);
      }
    }

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
      setMsg(data.msg);
    } else {
      setMsg("Erreur lors de la mise à jour de la destination");
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

      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titre de la destination</label>
        <input
          type="text"
          id="title"
          name="title"
          value={mystDest.title}
          onChange={handleChange}
        />

        <label htmlFor="climate">Indice n°1 : Le climat</label>
        <textarea
          type="text"
          name="climate"
          value={mystDest.climate}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="experience">Indice n°2 : Le Type d'Expérience</label>
        <textarea
          type="text"
          name="experience"
          value={mystDest.experience}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="activity">
          Indice n°3 : Le Niveau d’Activité Physique
        </label>
        <textarea
          type="text"
          name="activity"
          value={mystDest.activity}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="location">Indice n°4 : La Région Géographique</label>
        <textarea
          type="text"
          name="location"
          value={mystDest.location}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="budget">Budget par personne</label>
        <input
          type="number"
          id="budget"
          name="budget"
          value={mystDest.budget}
          onChange={handleChange}
        />

        <label htmlFor="recoDuration">Durée recommandée</label>
        <input
          type="number"
          id="recoDuration"
          name="recoDuration"
          value={mystDest.recoDuration}
          onChange={handleChange}
        />

        <label htmlFor="image">
          L'image (extensions autorisées : .png, .jpg, .jpeg, .webp ; taille
          maximale de l'image : 2 Mo)
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
        />

        <button type="submit">Mettre à jour la destination</button>
      </form>
    </main>
  );
}

export default UpdateMystDest;
