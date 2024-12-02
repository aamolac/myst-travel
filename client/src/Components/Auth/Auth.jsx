import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoginContext } from "../../store/user/Context.jsx";

function Auth() {
  // useContext permet d'accéder au contexte global 'Context', ici il contient l'état global et les fonctions comme 'login'
  const { login } = useContext(LoginContext);
  // États pour stocker les données du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useState pour gérer les messages d'erreur ou d'information
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Défiler en haut de la page
  };

  async function submitHandler(e) {
    e.preventDefault();

    // Validation de l'email
    const emailValidate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailValidate.test(email)) {
      setMsg("L'adresse email n'est pas valide.");
      return;
    }

    // Validation du mot de passe
    if (!password || password.length < 8) {
      setMsg(
        "Le mot de passe doit contenir au moins 8 caractères, avec au moins une minuscule, une majuscule, un chiffre et un caractère spécial."
      );
      return;
    }

    // Envoi des données au back-end
    const response = await fetch("http://localhost:9000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      login(data.user); // Met à jour le contexte global avec les données utilisateur
      navigate(-1);
    } else {
      setMsg(data.msg); // Affiche un message d'erreur si la connexion échoue
    }
  }

  return (
    <main>
      <section className="auth">
        <h2>Connexion</h2>

        {msg && <p className="message">{msg}</p>}
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Entrer votre adresse mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Met à jour 'username' à chaque saisie
            required
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Entrer votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Met à jour 'password' à chaque saisie
            required
          />

          <button type="submit">Se connecter</button>
          <p>
            Vous n'avez pas encore de compte ?{" "}
            <Link to="/register" id="account" onClick={scrollToTop}>
              Inscrivez-vous
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Auth;
