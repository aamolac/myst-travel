import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoginContext } from "../../store/user/Context.jsx";

function Auth() {
  // useContext permet d'accéder au contexte global 'Context', ici il contient l'état global et les fonctions comme 'login'
  const { user, login } = useContext(LoginContext);
  // États pour stocker les données du formulaire
  const [email, setEmail] = useState(""); // Changement de 'username' à 'email'
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false); //

  // useState pour gérer les messages d'erreur ou d'information. 'msg' stocke le message, 'setMsg' le modifie.
  const [msg, setMsg] = useState(null);
  // useNavigate est un hook de React Router qui permet de rediriger l'utilisateur vers une autre page
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    // Validation de l'email
    if (!email || !/.+@.+\..+/.test(email)) {
      setMsg("Veuillez entrer une adresse email valide.");
      return;
    }

    // Validation du mot de passe
    if (!password || password.length < 8) {
      setMsg("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    // Vérification de la case à cocher
    if (!acceptedTerms) {
      setMsg(
        "Vous devez accepter les conditions générales d'utilisation et la politique de confidentialité."
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
      body: JSON.stringify({ email, password }), // Utilisation de 'email' au lieu de 'username'
    });

    const data = await response.json();
    console.log("Données renvoyées par l'API : ", data);

    if (response.ok) {
      console.log("Utilisateur reçu après login :", data.user);
      login(data.user); // Met à jour le contexte global avec les données utilisateur
      navigate("/"); // Redirige vers la page d'accueil après la connexion
    } else {
      setMsg(data.msg); // Affiche un message d'erreur si la connexion échoue
    }
  }

  // Ajoute un console.log après la connexion pour vérifier l'état utilisateur
  useEffect(() => {
    console.log("État utilisateur après connexion :", user);
  }, [user]);

  return (
    <main>
      <div id="login">
        <h2>Connexion</h2>
        {/* Si 'msg' contient un message, on l'affiche à l'écran */}
        {msg && <p>{msg}</p>}
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Entrer votre adresse mail"
            value={email} // La valeur de l'input est liée à l'état 'username'
            onChange={(e) => setEmail(e.target.value)} // Met à jour 'username' à chaque saisie
            required
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            placeholder="Entrer votre mot de passe"
            value={password} // La valeur de l'input est liée à l'état 'password'
            onChange={(e) => setPassword(e.target.value)} // Met à jour 'password' à chaque saisie
            required
          />

          <div>
            <input
              type="checkbox"
              id="acceptTerms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <label htmlFor="acceptTerms">
              J’accepte les{" "}
              <Link to="/terms-of-use">conditions générales d'utilisation</Link>{" "}
              et la{" "}
              <Link to="/privacy-policy">politique de confidentialité</Link>.
            </label>
          </div>

          <button type="submit">Se connecter</button>
          <p>
            Pas encore de compte ?
            <Link to="/register" id="account">
              S'inscrire
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Auth;
