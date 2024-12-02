import bcrypt from "bcrypt";

import Auth from "../model/Auth.js";

// REGISTER
const register = async (req, res) => {
  try {
    // Changement de const à let pour email
    let { firstname, lastname, email, password } = req.body;

    // Supprimer les espaces au début/à la fin des champs
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    password = password.trim();

    // Vérification des infos
    if (firstname.length < 2 || !/^[A-Za-zÀ-ÿ]+$/.test(firstname)) {
      return res.status(400).json({
        msg: "Le prénom doit avoir au moins 2 caractères et ne contenir que des lettres.",
      });
    }

    if (lastname.length < 2 || !/^[A-Za-zÀ-ÿ]+$/.test(lastname)) {
      return res.status(400).json({
        msg: "Le nom doit avoir au moins 2 caractères et ne contenir que des lettres.",
      });
    }

    // Validation simplifiée de l'email
    const emailValidate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailValidate.test(email)) {
      return res.status(400).json({
        msg: "L'adresse email n'est pas valide.",
      });
    }

    // Vérification des espaces internes dans l'email
    if (email.includes(" ")) {
      return res.status(400).json({
        msg: "L'adresse email ne doit pas contenir d'espaces.",
      });
    }

    // Validation du mdp
    if (
      password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[\W_]/.test(password)
    ) {
      return res.status(400).json({
        msg: "Le mot de passe doit avoir au moins 8 caractères et au moins une minuscule, une majuscule, un chiffre et un caractère spécial.",
      });
    }

    // Vérification des espaces internes dans le mot de passe
    if (password.includes(" ")) {
      return res.status(400).json({
        msg: "Le mot de passe ne doit pas contenir d'espaces.",
      });
    }

    // Nettoyage de l'adresse e-mail (suppression du "+1" s'il est présent)
    email = email.replace("+1", "");

    // vérifier si l'email existe déjà
    const existingUser = await Auth.getOneByEmail(email);
    if (existingUser) {
      return res.status(400).json({ msg: "L'adresse email existe déjà." });
    }

    // Hashage du mdp
    // méthode hash, prend en paramètre le mdp et le nbre de tours de la fonction de hachage
    //plus la valeur est élevée plus le hash est sécurisé et coûteux en ressources
    const hash = await bcrypt.hash(password, 10);
    // on ajoute le nouvel utilisateur à la BDD avec ttes les infos
    // et on passe le mdp haché
    await Auth.add(firstname, lastname, email, hash);
    res.json({ msg: "Utilisateur créé" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // préparation de la requête SQL afin de vérifier si l'email existe
    const [[user]] = await Auth.getOneByEmail(email);

    // on récupère la donnée dans un tableau bi-dimensional --> destructuration double
    // Vérifie si un utilisateur avec cet email a été trouvé dans la BDD
    if (user) {
      // méthode compare de bcrypt : compare le mdp fourni avec celui stocké dans la BDD
      const same = await bcrypt.compare(password, user.password);
      // si les mdp correspondent
      if (same) {
        // préparation de la requête SQL afin de vérifier si l'email existe
        // const [[userById]] = await Auth.getUserInfoById(id);

        // Stocke les infos de l'utilisateur dans la session pour maintenir l'état de la connexion
        req.session.user = {
          id: user.id, // ID de l'utilisateur récupéré depuis la base de données
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
        };

        // Marque l'utilisateur comme connecté en définissant 'isLogged' à true dans la session
        req.session.isLogged = true;

        console.log("Utilisateur connecté :", req.session.user);
        console.log("Utilisateur ID :", req.session.user.id);
        // Renvoie une réponse JSON avec le prénom et le nom de l'utilisateur
        return res.json({
          msg: "Utilisateur connecté",
          isLogged: true,
          user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
          },
        });
      }
    }

    return res.status(500).json({
      msg: "Echec de la connexion. L'adresse email et le mot de passe ne correspondent pas.",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// LOGOUT
const logout = (req, res) => {
  try {
    // la méthode destroy de l'objet session détruit la session en cours
    // on passe une fonction de callback pour être sûr que la session est bien détruite
    req.session.destroy(() => {
      req.session = null;
      res.clearCookie("connect.sid");
      res.status(200).json({ msg: "Utilisateur déconnecté" });
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// CHECK-AUTH
const check_auth = async (req, res) => {
  try {
    const { user } = req.session;
    if (user) {
      // si user existe
      res.json({ isLogged: true, user });
    } else {
      res.status(401).json({ isLogged: false });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export { register, login, logout, check_auth };
