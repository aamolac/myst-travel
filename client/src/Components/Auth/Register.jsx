import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoginContext } from "../../store/user/Context.jsx";

function Register() {
  // useContext permet d'accéder au contexte global 'Context', ici il contient l'état global et les fonctions comme 'login'
  const { register } = useContext(LoginContext);

  // États pour stocker les données du formulaire
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // useState pour gérer les messages d'erreur ou d'information
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Défiler en haut de la page
  };

  // Fonction appelée lors de la soumission du formulaire
  async function submitHandler(e) {
    // Empêche le rechargement de la page lors de la soumission du formulaire
    e.preventDefault();

    // Validation des champs
    if (firstname.length < 2 || !/^[A-Za-zÀ-ÿ]+$/.test(firstname)) {
      setMsg(
        "Le prénom doit avoir au moins 2 caractères et ne contenir que des lettres."
      );
      return;
    }

    if (lastname.length < 2 || !/^[A-Za-zÀ-ÿ]+$/.test(lastname)) {
      setMsg(
        "Le nom doit avoir au moins 2 caractères et ne contenir que des lettres."
      );
      return;
    }

    const emailValidate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailValidate.test(email)) {
      setMsg("L'adresse email n'est pas valide.");
      return;
    }

    // Vérification des espaces internes dans l'email
    if (email.includes(" ")) {
      return res.status(400).json({
        msg: "L'adresse email ne doit pas contenir d'espaces.",
      });
    }

    if (
      password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[\W_]/.test(password)
    ) {
      setMsg(
        "Le mot de passe doit avoir au moins 8 caractères, inclure au moins une minuscule, une majuscule, un chiffre et un caractère spécial."
      );
      return;
    }

    // Vérification des espaces internes dans le mot de passe
    if (password.includes(" ")) {
      return res.status(400).json({
        msg: "Le mot de passe ne doit pas contenir d'espaces.",
      });
    }

    // Vérification de la case à cocher
    if (!acceptedTerms) {
      setMsg(
        "Vous devez accepter les conditions générales d'utilisation et la politique de confidentialité."
      );
      return;
    }

    const response = await fetch("http://localhost:9000/api/v1/auth/register", {
      method: "POST",
      headers: {
        // des données au format JSON qui vont transiter
        "Content-Type": "application/json",
      },
      credentials: "include",
      // body contient les données qu'on converti en JSON
      body: JSON.stringify({ firstname, lastname, email, password }),
    });
    // conversion de notre réponse json envoyé depuis le back
    const data = await response.json();

    if (response.ok) {
      register(data.user); // Met à jour le contexte global avec le nom d'utilisateur
      navigate("/auth");
    } else {
      setMsg(data.msg); // Affiche un message d'erreur si la connexion échoue
    }
  }

  return (
    <main>
      <section className="auth">
        <h2>Inscription</h2>

        {msg && <p className="message">{msg}</p>}
        <form onSubmit={submitHandler}>
          <label htmlFor="firstname">Prénom</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Entrer votre prénom"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)} // Met à jour 'firstname' à chaque saisie
            required
          />
          <label htmlFor="lastname">Nom</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Entrer votre nom"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Entrer votre adresse mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Mot de passe</label>
          <p className="password-condition">
            Minimum 8 caractères, 1 minuscule, 1 majuscule, 1 chiffre, 1
            caractère spécial
          </p>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Entrer votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div>
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <label htmlFor="acceptTerms">
              J’accepte les{" "}
              <Link to="/terms-of-use" onClick={scrollToTop}>
                conditions générales d'utilisation
              </Link>{" "}
              et la{" "}
              <Link to="/privacy-policy" onClick={scrollToTop}>
                politique de confidentialité
              </Link>
              .
            </label>
          </div>
          <button type="submit">S'inscrire</button>
        </form>
      </section>
    </main>
  );
}

export default Register;
