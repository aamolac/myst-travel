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
  // Pour stocker les options récupérées depuis la BDD
  const [objectOptions, setObjectOptions] = useState([]);
  const [msg, setMsg] = useState("");

  //Validation des champs
  const validateForm = () => {
    const { email, objectContact_id, message } = formContact;

    // Validation de tout les champs requis
    if (!email || !objectContact_id || !message) {
      setMsg("Tous les champs sont requis.");
      return false;
    }
    // Validation de l'email
    const emailValidate = /.+@.+\..+/;
    if (!emailValidate.test(email)) {
      setMsg("L'adresse email n'est pas valide.");
      return false;
    }
    // Vérification des espaces internes dans l'email
    if (email.includes(" ")) {
      setMsg("L'adresse email ne doit pas contenir d'espaces.");
      return false;
    }

    if (!message || message.trim().length < 10) {
      setMsg("Le message doit contenir au moins 10 caractères.");
      return false;
    }
    // Si tout est valide, on réinitialise le message d'erreur
    setMsg("");
    return true;
  };

  // Gérer les changements de champs de formulaire
  const handleChange = (e) => {
    setFormContact({
      ...formContact,
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
        setMsg(data.msg);
      } else {
        setMsg(data.msg);
      }
    } catch (error) {
      setMsg(
        "Erreur lors de l'envoi de la demande. Veuillez réessayer plus tard"
      );
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
        );
        const data = await response.json();
        if (response.ok) {
          // Mettre à jour l'état avec les options récupérées
          setObjectOptions(data);
        } else {
          setMsg("Erreur lors de la récupération des objets de message.");
        }
      } catch (err) {
        setMsg("Erreur de communication avec le serveur.");
      }
    };

    fetchObjectOptions();
  }, []);

  return (
    <main id="contact" aria-label="Page de contact">
      <nav
        className="menu-accessible"
        role="navigation"
        aria-label="Menu accessible avec tabulation"
      >
        <a href="#contact-detail">Coordonnées de Myst'Travel</a>
        <a href="#open-hours">Horaires d'ouvertures de l'agence</a>
        <a href="#form-contact">Formulaire de contact</a>
        <a href="#social-media">Retrouvez-nous sur les réseaux</a>
      </nav>
      <section className="title">
        <h2>Nous contacter</h2>
      </section>
      <section
        className="container"
        id="contact-detail"
        aria-label="Coordonnées de Myst'Travel"
      >
        <div>
          <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" />
          <h3>Adresse</h3>
          <address>
            <p>Myst'Travel</p>
            <p>15 avenue des explorateurs</p>
            <p>75008 Paris, France</p>
          </address>
        </div>
        <div>
          <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
          <h3>Email</h3>
          <a
            href="mailto:contact@myst-travel.com"
            aria-label="Envoyer un email à Myst'Travel"
          >
            contact@myst-travel.com
          </a>
        </div>
        <div>
          <FontAwesomeIcon icon={faPhone} aria-hidden="true" />
          <h3>Téléphone</h3>
          <a href="tel:+33123456789" aria-label="Appeler Myst'Travel">
            +33 1 23 45 67 89
          </a>
        </div>
      </section>
      <section id="open-hours">
        <h3>Horaires d'ouvertures de l'agence</h3>
        <p>Mardi au Samedi : 9h - 20h</p>
        <p>Dimanche et lundi : fermé</p>
      </section>
      <section id="form-contact" aria-label="Formulaire de contact">
        <h3>
          Si vous avez des questions, n'hésitez pas à nous envoyer un message.
        </h3>

        <form onSubmit={submitHandler}>
          {msg && (
            <p className="message" role="alert">
              {msg}
            </p>
          )}
          <label htmlFor="email">Votre adresse email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Entrer votre adresse mail"
            value={formContact.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="objectContact">Objet de votre message</label>
          <select
            id="objectContact"
            name="objectContact_id"
            value={formContact.objectContact_id}
            onChange={handleChange}
            required
          >
            <option value="">Veuillez sélectionner un objet</option>
            {objectOptions.map((object) => (
              <option key={object.id} value={object.id}>
                {object.choice}
              </option>
            ))}
          </select>
          <label htmlFor="message">Votre message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Veuillez indiquer votre message"
            value={formContact.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" aria-label="Envoyer votre message">
            Envoyer un message
          </button>
        </form>
      </section>
      <section id="social-media">
        <h3>Retrouvez-nous sur les réseaux</h3>
        <div>
          <Link
            to="https://www.facebook.com"
            target="_blank"
            aria-label="Suivez-nous sur Facebook"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </Link>
          <Link
            to="https://www.instagram.com"
            target="_blank"
            aria-label="Suivez-nous sur Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
          <Link
            to="https://x.com/"
            target="_blank"
            aria-label="Suivez-nous sur Twitter"
          >
            <FontAwesomeIcon icon={faXTwitter} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Contact;
