import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoginContext } from "../../store/user/Context.jsx";

function Auth() {
  // useContext permet d'accéder au contexte User, contient la fonction login
  const { login } = useContext(LoginContext);
  // États pour stocker les données du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Gérer la soumission du formulaire
  async function submitHandler(e) {
    // Empêche le rechargement de la page lors de la soumission du formulaire
    e.preventDefault();

    try {
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
        // Met à jour le contexte global avec les données utilisateur
        login(data.user);
        if (data.user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(
        `Erreur lors de la tentative de connexion : ${error.message}`
      );
      setMsg(
        "Une erreur s'est produite lors de la tentative de connexion. Veuillez vérifier votre connexion et réessayer."
      );
    }
  }

  return (
    <main aria-label="Page pour se connecter">
      <section className="auth">
        <h2>Connexion</h2>

        {msg && (
          <p className="message" role="alert">
            {msg}
          </p>
        )}
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Entrer votre adresse mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Met à jour 'email' à chaque saisie
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
          <button type="submit" aria-label="Se connecter">
            Se connecter
          </button>
          <p>
            Vous n'avez pas encore de compte ?{" "}
            <Link
              to="/auth/register"
              id="account"
              onClick={scrollToTop}
              aria-label="S'inscrire"
            >
              Inscrivez-vous
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Auth;
