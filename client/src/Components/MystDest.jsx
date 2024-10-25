import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MystDest() {
  // États pour stocker les données des destinations mystères
  const [mystDestinations, setMystDestinations] = useState([]);

  const fetchMystDest = async () => {
    const response = await fetch(
      "http://localhost:9000/api/v1/myst-dest/list",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    // On met à jour l'état avec les destinations récupérées
    setMystDestinations(data);
  };

  // useEffect pour charger les infos
  useEffect(() => {
    fetchMystDest();
  }, []);

  return (
    <main>
      <h1>Nos destinations mystères</h1>
      <h2>Le Voyage Commence Ici </h2>
      <p>
        Préparez-vous à partir pour une aventure inédite. Pas de noms de villes,
        pas de cartes, juste des indices pour vous guider vers votre prochaine
        grande évasion. Saurez-vous deviner votre prochaine destination mystère
        ?
      </p>
      <section id="container">
        <div id="myst-dest">
          {mystDestinations.map((mystDest) => (
            <article key={mystDest.id}>
              <h3>{mystDest.title}</h3>
              <img
                src={`http://localhost:9000/img/upload-MystDest/${mystDest.image}`}
                alt={mystDest.alt}
              />
              <p>Budget : {mystDest.budget} €</p>
              <p>Durée recommandée : {mystDest.recoDuration} jours</p>
              <Link to={`/myst-destination/${mystDest.id}`}>
                En savoir plus
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default MystDest;
