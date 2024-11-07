import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLocationDot,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

function Contact() {
  // États pour stocker les données du formulaire
  const [formContact, setFormContact] = useState({
    email: "",
    objectContact_id: "",
    message: "",
  });

  // Pour gérer les messages de retour
  const [msg, setMsg] = useState("");
  // Pour stocker les options récupérées depuis la BDD
  const [objectOptions, setObjectOptions] = useState([]);

  // Gérer les changements de champs de formulaire
  const handleChange = (e) => {
    setFormContact({
      ...formContact,
      [e.target.name]: e.target.value,
    });
  };

  //Validation des champs
  const validateForm = () => {
    const emailValidate = /.+@.+\..+/; // Validation simple de l'email

    if (!emailValidate.test(formContact.email)) {
      setMsg("L'adresse email n'est pas valide.");
      return false;
    }
    if (!formContact.objectContact_id) {
      setMsg("L'objet de contact est requis.");
      return false;
    }
    if (!formContact.message || formContact.message.trim().length < 10) {
      setMsg("Le message doit contenir au moins 10 caractères.");
      return false;
    }
    setMsg(""); // Si tout est valide, on réinitialise le message d'erreur
    return true;
  };

  // Gérer la soumission du formulaire
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Ne pas soumettre si le formulaire est invalide
    }

    try {
      const response = await fetch("http://localhost:9000/api/v1/contact/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formContact),
      });

      const data = await response.json();

      if (response.ok) {
        setMsg(data.msg); // Affiche le message de succès
      } else {
        setMsg(data.msg); // Affiche le message d'erreur renvoyé par le serveur
      }
    } catch (error) {
      setMsg("Erreur lors de l'envoi de la demande.");
    }
  };

  // Fonction pour récupérer les options d'objets de contact depuis la BDD
  // useEffect pour charger les options quand le composant est monté
  useEffect(() => {
    const fetchObjectOptions = async () => {
      try {
        const response = await fetch(
          "http://localhost:9000/api/v1/contact/object",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ); // URL de l'API pour récupérer les objets de contact
        const data = await response.json();

        if (response.ok) {
          setObjectOptions(data); // Mettre à jour l'état avec les options récupérées
        } else {
          setMsg("Erreur lors de la récupération des objets de contact.");
        }
      } catch (err) {
        setMsg("Erreur de communication avec le serveur.");
      }
    };

    fetchObjectOptions();
  }, []);

  return (
    <main>
      <h2>Nous contacter</h2>
      <section>
        <div>
          <FontAwesomeIcon icon={faLocationDot} />
          <h3>Adresse</h3>
          <p>Myst'Travel</p>
          <p>15 Avenue des Explorateurs</p>
          <p>75008 Paris, France</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faEnvelope} />
          <h3>Email</h3>
          <p>contact@myst-travel.com</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faPhone} />
          <h3>Numéro de téléphone</h3>
          <p>+33 1 23 45 67 89</p>
        </div>
      </section>
      <section id="contact">
        <h3>
          Si vous avez des questions, n'hésitez pas à nous envoyer un message.
        </h3>

        {msg && <p>{msg}</p>}
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Entrer votre adresse mail"
            value={formContact.email} // La valeur de l'input est liée à l'état 'email'
            onChange={handleChange} // Met à jour 'email' à chaque saisie
            required
          />
          <label htmlFor="objectContact">Objet du message</label>
          <select
            id="objectContact"
            name="objectContact_id"
            value={formContact.objectContact_id}
            onChange={handleChange}
          >
            <option value="">Choisir un objet</option>
            {objectOptions.map((object) => (
              <option key={object.id} value={object.id}>
                {object.choice}
              </option>
            ))}
          </select>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            placeholder="Entrer votre message"
            value={formContact.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Envoyer un message</button>
        </form>
      </section>
      <section>
        <h3>Rejoins-nous sur les réseaux</h3>
        <Link
          to="https://www.facebook.com"
          target="_blank"
          aria-label="Facebook"
        >
          <FontAwesomeIcon icon={faFacebookF} />
        </Link>
        <Link
          to="https://www.instagram.com"
          target="_blank"
          aria-label="Instagram"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </Link>
        <Link to="https://x.com/" target="_blank" aria-label="Twitter">
          <FontAwesomeIcon icon={faXTwitter} />
        </Link>
      </section>
    </main>
  );
}

export default Contact;
