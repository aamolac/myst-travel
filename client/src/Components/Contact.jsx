import { useState, useEffect } from "react";

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
  const [objectOptions, setObjectOptions] = useState([]); // Pour stocker les options récupérées depuis la BDD

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
        credentials: "include",
        body: JSON.stringify(formData),
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
  const fetchObjectOptions = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/v1/contact/objects"
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

  // useEffect pour charger les options quand le composant est monté
  useEffect(() => {
    fetchObjectOptions();
  }, []);

  return (
    <main>
      <section id="contact">
        <h2>
          Si vous avez des questions, n'hésitez pas à nous envoyer un message.
        </h2>
        {/* Si 'msg' contient un message, on l'affiche à l'écran */}
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
            {/* Map pour afficher les options récupérées dynamiquement */}
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
    </main>
  );
}

export default Contact;
