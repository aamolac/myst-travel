import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../store/user/Context.jsx";

function Register() {
  // useContext permet d'accéder au contexte global 'Context', ici il contient l'état global et les fonctions comme 'login'
  const { register } = useContext(LoginContext);

  // États pour stocker les données du formulaire
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useState pour gérer les messages d'erreur ou d'information. 'msg' stocke le message, 'setMsg' le modifie.
  const [msg, setMsg] = useState(null);

  // useNavigate est un hook de React Router qui permet de rediriger l'utilisateur vers une autre page
  const navigate = useNavigate();

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

    const response = await fetch("http://localhost:9000/api/v1/auth/register", {
      method: "POST", // quelle méthode de la route on veut atteindre sur notre back
      headers: {
        // configuration des headers
        // ici on lui dit que ce sont des données au format JSON qui vont transiter
        "Content-Type": "application/json",
      },
      credentials: "include",
      // et le fameux body qui contient les données qu'on converti en JSON
      body: JSON.stringify({ firstname, lastname, email, password }),
    });
    // conversion de notre réponse json envoyé depuis le back
    const data = await response.json();

    if (response.ok) {
      register(data.user); // Met à jour le contexte global avec le nom d'utilisateur
      navigate("/auth"); // Redirige vers la page d'accueil après la connexion
    } else {
      setMsg(data.msg); // Affiche un message d'erreur si la connexion échoue
    }
  }

  return (
    <main>
      <div id="register">
        <h2>Inscription</h2>

        {msg && <p>{msg}</p>}
        <form onSubmit={submitHandler}>
          <label htmlFor="firstname">Prénom</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Entrer votre prénom"
            value={firstname} // La valeur de l'input est liée à l'état 'firstname'
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
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Entrer votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </main>
  );
}

export default Register;
