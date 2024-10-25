import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "../store/user/Context.jsx";

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
  const [msg, setMsg] = useState("");

  // Validation du formulaire
  const validateForm = () => {
    const { startDate, endDate, numberAdult } = formReservation;

    if (!startDate || !endDate || !numberAdult) {
      setMsg("Tous les champs sont requis.");
      return false;
    }

    // Vérification que la date de fin est après la date de début
    if (endDate <= startDate) {
      setMsg("La date de retour doit être après la date de départ.");
      return false;
    }

    // Vérification que la date de départ est dans le futur
    const start = new Date(startDate);
    const today = new Date();
    if (start <= today) {
      setMsg("La date de départ doit être dans le futur.");
      return false;
    }

    // Validation que duration, budget, numberAdult et numberChild sont des nombres
    if (isNaN(numberAdult) || isNaN(formReservation.numberChild)) {
      setMsg(
        "Les champs 'nombre d'adultes' et 'nombre d'enfants' doivent être des nombres."
      );
      return false;
    }

    // Vérification qu'il y a au moins un adulte
    if (numberAdult < 1) {
      setMsg("Il doit y avoir au moins un adulte.");
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
        setMsg(data.msg);
      } else {
        setMsg(data.msg);
      }
    } catch (error) {
      console.error(error);
      setMsg("Erreur lors de l'envoi de la réservation.");
    }
  };

  return (
    <main>
      <h1>Réserver votre voyage</h1>
      <form id="reservation-form" onSubmit={submitHandler}>
        <label htmlFor="startDate">Date de début :</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          onChange={handleChange}
          value={formReservation.startDate}
        />

        <label htmlFor="endDate">Date de fin :</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          onChange={handleChange}
          value={formReservation.endDate}
        />

        <label htmlFor="numberAdult">Nombre d'adultes :</label>
        <input
          type="number"
          id="numberAdult"
          name="numberAdult"
          onChange={handleChange}
          value={formReservation.numberAdult}
          min="1"
          placeholder="Veuillez indiquer le nombre d'adulte (à partir de 12 ans)"
        />

        <label htmlFor="numberChild">Nombre d'enfants :</label>
        <input
          type="number"
          id="numberChild"
          name="numberChild"
          onChange={handleChange}
          value={formReservation.numberChild}
          min="0"
          placeholder="Veuillez indiquer le nombre d'enfant (moins de 12 ans)"
        />

        <button type="submit">Réserver</button>
      </form>
      {msg && <p>{msg}</p>}
    </main>
  );
}

export default Reservation;
