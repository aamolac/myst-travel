import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MystDest() {
  // États pour stocker les données des destinations mystères
  const [mystDestinations, setMystDestinations] = useState([]);
  // État pour le filtre de budget (tableau pour gérer plusieurs sélections)
  const [budgetFilter, setBudgetFilter] = useState([]);
  // État pour le filtre de durée
  const [durationFilter, setDurationFilter] = useState();
  // État pour le filtre du continent (tableau pour gérer plusieurs sélections)
  const [continentFilter, setContinentFilter] = useState([]);
  // État pour le filtre du climat (tableau pour gérer plusieurs sélections)
  const [climateFilter, setClimateFilter] = useState([]);
  // État pour le filtre d'activité (tableau pour gérer plusieurs sélections)
  const [activityFilter, setActivityFilter] = useState([]);
  // État pour le filtre d'hébergement (tableau pour gérer plusieurs sélections)
  const [accomodationFilter, setAccomodationFilter] = useState([]);
  // État pour calculer le nombre total de destinations et celles filtrées
  const [totalDestinations, setTotalDestinations] = useState(0);
  const [filteredCount, setFilteredCount] = useState(0);

  // Pour gérer les messages de retour
  const [msg, setMsg] = useState("");

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
    setTotalDestinations(data.length); // Mise à jour du total des destinations
  };

  // useEffect pour charger les infos
  useEffect(() => {
    fetchMystDest();
  }, []);

  useEffect(() => {
    // Mise à jour du nombre de destinations filtrées
    setFilteredCount(filteredDestinations.length);
  }, [
    mystDestinations.status !== 0,
    budgetFilter,
    durationFilter,
    continentFilter,
    climateFilter,
    activityFilter,
    accomodationFilter,
    mystDestinations,
  ]);

  // Fonction pour gérer les changements dans les cases à cocher du budget
  const handleBudgetChange = (e) => {
    const value = e.target.value;

    // Vérifier si la valeur est déjà dans le tableau
    if (budgetFilter.includes(value)) {
      // Retirer la valeur si elle est déjà présente
      setBudgetFilter(budgetFilter.filter((item) => item !== value));
    } else {
      // Ajouter la valeur si elle n'est pas présente
      setBudgetFilter([...budgetFilter, value]);
    }
  };

  // Fonction pour gérer les changements de la durée
  const handleDurationChange = (e) => {
    const value = Number(e.target.value);

    if (value < 2 || value > 21) {
      setMsg("La durée doit être comprise entre 2 et 21 jours.");
      return;
    }
    setDurationFilter(value);
    setMsg(""); // Réinitialiser le message si la validation est correcte
  };

  // Fonction pour gérer les changements des cases à cocher du continent
  const handleContinentChange = (e) => {
    const value = e.target.value;

    // Vérifier si la valeur est déjà dans le tableau
    if (continentFilter.includes(value)) {
      // Retirer la valeur si elle est déjà présente
      setContinentFilter(continentFilter.filter((item) => item !== value));
    } else {
      // Ajouter la valeur si elle n'est pas présente
      setContinentFilter([...continentFilter, value]);
    }
  };

  // Fonction pour gérer les changements des cases à cocher du climat
  const handleClimateChange = (e) => {
    const value = e.target.value;

    // Vérifier si la valeur est déjà dans le tableau
    if (climateFilter.includes(value)) {
      // Retirer la valeur si elle est déjà présente
      setClimateFilter(climateFilter.filter((item) => item !== value));
    } else {
      // Ajouter la valeur si elle n'est pas présente
      setClimateFilter([...climateFilter, value]);
    }
  };

  // Fonction pour gérer les changements des cases à cocher de l'activité
  const handleActivityChange = (e) => {
    const value = e.target.value;

    // Vérifier si la valeur est déjà dans le tableau
    if (activityFilter.includes(value)) {
      // Retirer la valeur si elle est déjà présente
      setActivityFilter(activityFilter.filter((item) => item !== value));
    } else {
      // Ajouter la valeur si elle n'est pas présente
      setActivityFilter([...activityFilter, value]);
    }
  };

  // Fonction pour gérer les changements des cases à cocher de l'hébergement
  const handleAccomodationChange = (e) => {
    const value = e.target.value;

    // Vérifier si la valeur est déjà dans le tableau
    if (accomodationFilter.includes(value)) {
      // Retirer la valeur si elle est déjà présente
      setAccomodationFilter(
        accomodationFilter.filter((item) => item !== value)
      );
    } else {
      // Ajouter la valeur si elle n'est pas présente
      setAccomodationFilter([...accomodationFilter, value]);
    }
  };

  // Fonction pour filtrer les destinations
  const filteredDestinations = mystDestinations.filter((dest) => {
    // Vérifie si la destination est en ligne (status 0)
    if (dest.status !== "En ligne") {
      return false;
    }

    // Vérifie la durée
    if (durationFilter !== undefined) {
      if (
        dest.minDuration > durationFilter ||
        dest.maxDuration < durationFilter
      ) {
        return false;
      }
    }

    // Vérifie le filtre des continents (s'il y en a)
    if (
      continentFilter.length > 0 &&
      !continentFilter.includes(dest.continent)
    ) {
      return false;
    }

    // Vérifie le filtre du climat (s'il y en a)
    if (climateFilter.length > 0 && !climateFilter.includes(dest.climate)) {
      return false;
    }

    // Vérifie le filtre de l'activité (s'il y en a)
    if (activityFilter.length > 0 && !activityFilter.includes(dest.activity)) {
      return false;
    }

    // Vérifie le filtre de l'hébergement (s'il y en a)
    if (
      accomodationFilter.length > 0 &&
      !accomodationFilter.includes(dest.accomodation)
    ) {
      return false;
    }

    // Si aucun filtre du budget, afficher toutes les destinations
    if (budgetFilter.length === 0) return true;

    for (let budgetRange of budgetFilter) {
      if (
        (budgetRange === "50-100" && dest.budget > 50 && dest.budget <= 100) ||
        (budgetRange === "100-150" &&
          dest.budget > 100 &&
          dest.budget <= 150) ||
        (budgetRange === "150-200" &&
          dest.budget > 150 &&
          dest.budget <= 200) ||
        (budgetRange === "200-300" && dest.budget > 200 && dest.budget <= 300)
      ) {
        return true;
      }
    }
    return false;
  });

  // Vérification si au moins un filtre est appliqué
  const hasFiltersApplied =
    mystDestinations.status !== 0 ||
    budgetFilter.length > 0 ||
    durationFilter !== undefined ||
    continentFilter.length > 0 ||
    climateFilter.length > 0 ||
    activityFilter.length > 0 ||
    accomodationFilter.length > 0;

  return (
    <main>
      <h2>Nos destinations mystères</h2>
      <h3>Le Voyage Commence Ici </h3>
      <p>
        Préparez-vous à partir pour une aventure inédite. Pas de noms de villes,
        pas de cartes, juste des indices pour vous guider vers votre prochaine
        grande évasion. Saurez-vous deviner votre prochaine destination mystère
        ?
      </p>
      <p>
        A savoir que la durée de séjour de nos destinations mystères est
        comprise entre 2 et 21 jours.
      </p>
      <p>
        Total des destinations :{" "}
        {hasFiltersApplied > 0 ? filteredCount : totalDestinations}
      </p>
      {msg && <p className="message">{msg}</p>}
      <fieldset>
        <legend>Filtrer par :</legend>
        <div>
          <h4>Budget par jour/personne</h4>
          <label htmlFor="budget-50-100">50 - 100 €</label>
          <input
            type="checkbox"
            id="budget-50-100"
            value="50-100"
            onChange={handleBudgetChange}
          />
          <label htmlFor="budget-100-150">100 - 150 €</label>
          <input
            type="checkbox"
            id="budget-100-150"
            value="100-150"
            onChange={handleBudgetChange}
          />
          <label htmlFor="budget-150-200">150 - 200 €</label>
          <input
            type="checkbox"
            id="budget-150-200"
            value="150-200"
            onChange={handleBudgetChange}
          />
          <label htmlFor="budget-200-300">200 - 300 €</label>
          <input
            type="checkbox"
            id="budget-200-300"
            value="200-300"
            onChange={handleBudgetChange}
          />
        </div>
        <div>
          <h4>Durée du séjour (jours)</h4>
          <label htmlFor="duration">Durée :</label>
          <input
            type="number"
            id="duration"
            min="2"
            max="21"
            value={durationFilter || ""}
            onChange={handleDurationChange}
          />
        </div>
        <div>
          <h4>Continent</h4>
          <label htmlFor="Europe">Europe</label>
          <input
            type="checkbox"
            id="Europe"
            value="Europe"
            onChange={handleContinentChange}
          />
          <label htmlFor="Amérique">Amérique</label>
          <input
            type="checkbox"
            id="Amérique"
            value="Amérique"
            onChange={handleContinentChange}
          />
          <label htmlFor="Asie">Asie</label>
          <input
            type="checkbox"
            id="Asie"
            value="Asie"
            onChange={handleContinentChange}
          />
          <label htmlFor="Afrique">Afrique</label>
          <input
            type="checkbox"
            id="Afrique"
            value="Afrique"
            onChange={handleContinentChange}
          />
          <label htmlFor="Océanie">Océanie</label>
          <input
            type="checkbox"
            id="Océanie"
            value="Océanie"
            onChange={handleContinentChange}
          />
        </div>
        <div>
          <h4>Climat</h4>
          <label htmlFor="Chaud et ensoleillé">Chaud et ensoleillé</label>
          <input
            type="checkbox"
            id="Chaud et ensoleillé"
            value="Chaud et ensoleillé"
            onChange={handleClimateChange}
          />
          <label htmlFor="Tempéré/doux">Tempéré et doux</label>
          <input
            type="checkbox"
            id="Tempéré et doux"
            value="Tempéré et doux"
            onChange={handleClimateChange}
          />
          <label htmlFor="Frais">Frais</label>
          <input
            type="checkbox"
            id="Frais"
            value="Frais"
            onChange={handleClimateChange}
          />
          <label htmlFor="Humide">Humide</label>
          <input
            type="checkbox"
            id="Humide"
            value="Humide"
            onChange={handleClimateChange}
          />
          <label htmlFor="Hivernal">Hivernal</label>
          <input
            type="checkbox"
            id="Hivernal"
            value="Hivernal"
            onChange={handleClimateChange}
          />
        </div>
        <div>
          <h4>Niveau d'activité physique</h4>
          <label htmlFor="Relax">Relax</label>
          <input
            type="checkbox"
            id="Relax"
            value="Relax"
            onChange={handleActivityChange}
          />
          <label htmlFor="Modéré">Modéré</label>
          <input
            type="checkbox"
            id="Modéré"
            value="Modéré"
            onChange={handleActivityChange}
          />
          <label htmlFor="Dynamique">Dynamique</label>
          <input
            type="checkbox"
            id="Dynamique"
            value="Dynamique"
            onChange={handleActivityChange}
          />
          <label htmlFor="Intensif">Intensif</label>
          <input
            type="checkbox"
            id="Intensif"
            value="Intensif"
            onChange={handleActivityChange}
          />
          <label htmlFor="Aventureux">Aventureux</label>
          <input
            type="checkbox"
            id="Aventureux"
            value="Aventureux"
            onChange={handleActivityChange}
          />
        </div>
        <div>
          <h4>Type d'hébergement</h4>
          <label htmlFor="Classique et Confortable">
            Classique et Confortable
          </label>
          <input
            type="checkbox"
            id="Classique et Confortable"
            value="Classique et Confortable"
            onChange={handleAccomodationChange}
          />
          <label htmlFor="Nature et Authentique">Nature et Authentique</label>
          <input
            type="checkbox"
            id="Nature et Authentique"
            value="Nature et Authentique"
            onChange={handleAccomodationChange}
          />
          <label htmlFor="Économique et Pratique">Économique et Pratique</label>
          <input
            type="checkbox"
            id="Économique et Pratique"
            value="Économique et Pratique"
            onChange={handleAccomodationChange}
          />
          <label htmlFor="Séjour multi-hébergements">
            Séjour multi-hébergements
          </label>
          <input
            type="checkbox"
            id="Séjour multi-hébergements"
            value="Séjour multi-hébergements"
            onChange={handleAccomodationChange}
          />
        </div>
      </fieldset>

      <section id="container">
        <div id="myst-dest">
          {filteredDestinations.map((mystDest) => (
            <article key={mystDest.id}>
              <h4>{mystDest.title}</h4>
              <img
                src={`http://localhost:9000/img/upload-MystDest/${mystDest.image}`}
                alt={mystDest.alt}
              />
              <p>Budget par jour/personne : {mystDest.budget} €</p>
              <p>
                Durée : {mystDest.minDuration} à {mystDest.maxDuration} jours
              </p>
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
