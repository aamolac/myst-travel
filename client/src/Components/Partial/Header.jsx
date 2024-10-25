import { NavLink, useNavigate, Link } from "react-router-dom";

import { useContext } from "react";
import { LoginContext } from "../../store/user/Context.jsx";

function Header() {
  // pour récupérer les données de l'utilisateur on utilise le hook useContext
  // en lui passant le contexte à utiliser ici il correspond au contexte de l'utilisateur
  const { user, isLogged, logout } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetch("http://localhost:9000/api/v1/auth/logout", {
      method: "GET",
      credentials: "include", // inclure les cookies de session
    });

    if (response.ok) {
      // Mettre à jour le contexte global pour signifier que l'utilisateur est déconnecté
      logout();
      // Rediriger vers la page d'accueil
      navigate("/");
    } else {
      console.error("Logout failed");
    }
  };
  return (
    <header>
      <section id="container">
        <h1>Myst'Travel</h1>
        <nav>
          <NavLink to={"/"}>Accueil</NavLink>
          <NavLink to={"/about-us"}>Qui sommes-nous ?</NavLink>
          <NavLink to={"/myst-destination"}>Nos destinations mystères</NavLink>

          {isLogged ? (
            <>
              <NavLink to={"/customized-trip"}>
                Nos destinations sur-mesure
              </NavLink>
              <NavLink to={"/contact"}>Contact</NavLink>
              <Link onClick={handleLogout}>LOGOUT</Link>
            </>
          ) : (
            <>
              <NavLink to={"/contact"}>Contact</NavLink>
              <NavLink to={"/auth"}>LOGIN</NavLink>
              <NavLink to={"/register"}>REGISTER</NavLink>
            </>
          )}
        </nav>
      </section>
    </header>
  );
}

export default Header;
