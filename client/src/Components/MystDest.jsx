import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MystDest() {
  // États pour stocker les données des destinations mystères
  const [mystDestinations, setMystDestinations] = useState([]);
  // État pour le filtre de budget (tableau pour gérer plusieurs sélections)
  const [budgetFilter, setBudgetFilter] = useState([]);
  // État pour le filtre de durée
  const [durationFilter, setDurationFilter] = useState(null);
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

  const [openSections, setOpenSections] = useState(null);

  //Etat pour la tablette
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768);

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Défiler en haut de la page
  };

  // Met à jour la taille de l'écran lorsque la fenêtre est redimensionnée
  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSection = (section) => {
    setOpenSections(openSections === section ? null : section);
  };

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

  // Charger l'état des filtres depuis sessionStorage
  useEffect(() => {
    const savedBudgetFilter = sessionStorage.getItem("budgetFilter");
    const savedContinentFilter = sessionStorage.getItem("continentFilter");
    const savedClimateFilter = sessionStorage.getItem("climateFilter");
    const savedActivityFilter = sessionStorage.getItem("activityFilter");
    const savedAccomodationFilter =
      sessionStorage.getItem("accomodationFilter");
    const savedDurationFilter = sessionStorage.getItem("durationFilter");

    if (savedBudgetFilter) setBudgetFilter(JSON.parse(savedBudgetFilter));
    if (savedContinentFilter)
      setContinentFilter(JSON.parse(savedContinentFilter));
    if (savedClimateFilter) setClimateFilter(JSON.parse(savedClimateFilter));
    if (savedActivityFilter) setActivityFilter(JSON.parse(savedActivityFilter));
    if (savedAccomodationFilter)
      setAccomodationFilter(JSON.parse(savedAccomodationFilter));
    // Assurer que savedDurationFilter n'est pas undefined avant de le parser
    if (savedDurationFilter && savedDurationFilter !== "undefined") {
      setDurationFilter(JSON.parse(savedDurationFilter));
    }
  }, []);

  // Fonction pour gérer les changements de la durée
  const handleDurationChange = (e) => {
    const value = e.target.value;
    // Permettre à l'utilisateur de vider l'input
    if (value === "") {
      setDurationFilter(null);
      setMsg(""); // Réinitialiser le message
      return;
    }

    // Convertir la valeur en nombre
    const numericValue = Number(value);

    // Validation si la valeur est un nombre
    if (isNaN(numericValue)) {
      setMsg("Veuillez entrer un nombre valide.");
      return;
    }

    if (numericValue < 2 || numericValue > 21) {
      setMsg("La durée doit être comprise entre 2 et 21 jours.");
      return;
    }

    setDurationFilter(numericValue);
    setMsg(""); // Réinitialiser le message si la validation est correcte
  };

  const handleCheckboxChange = (e, filterState, setFilterState) => {
    const value = e.target.value;
    if (filterState.includes(value)) {
      // Retirer la valeur si elle est déjà présente
      setFilterState(filterState.filter((item) => item !== value));
    } else {
      // Ajouter la valeur si elle n'est pas présente
      setFilterState([...filterState, value]);
    }
  };

  const handleBudgetChange = (e) =>
    handleCheckboxChange(e, budgetFilter, setBudgetFilter);
  const handleContinentChange = (e) =>
    handleCheckboxChange(e, continentFilter, setContinentFilter);
  const handleClimateChange = (e) =>
    handleCheckboxChange(e, climateFilter, setClimateFilter);
  const handleActivityChange = (e) =>
    handleCheckboxChange(e, activityFilter, setActivityFilter);
  const handleAccomodationChange = (e) =>
    handleCheckboxChange(e, accomodationFilter, setAccomodationFilter);

  useEffect(() => {
    // Sauvegarder dans sessionStorage à chaque changement
    sessionStorage.setItem("budgetFilter", JSON.stringify(budgetFilter));
    sessionStorage.setItem("continentFilter", JSON.stringify(continentFilter));
    sessionStorage.setItem("climateFilter", JSON.stringify(climateFilter));
    sessionStorage.setItem("activityFilter", JSON.stringify(activityFilter));
    sessionStorage.setItem(
      "accomodationFilter",
      JSON.stringify(accomodationFilter)
    );
  }, [
    budgetFilter,
    continentFilter,
    climateFilter,
    activityFilter,
    accomodationFilter,
  ]);

  // Enregistrer l'état des filtres dans sessionStorage à chaque mise à jour
  useEffect(() => {
    sessionStorage.setItem("budgetFilter", JSON.stringify(budgetFilter));
    sessionStorage.setItem("continentFilter", JSON.stringify(continentFilter));
    sessionStorage.setItem("climateFilter", JSON.stringify(climateFilter));
    sessionStorage.setItem("activityFilter", JSON.stringify(activityFilter));
    sessionStorage.setItem(
      "accomodationFilter",
      JSON.stringify(accomodationFilter)
    );
    sessionStorage.setItem("durationFilter", JSON.stringify(durationFilter));
  }, [
    budgetFilter,
    continentFilter,
    climateFilter,
    activityFilter,
    accomodationFilter,
    durationFilter,
  ]);

  // Fonction pour filtrer les destinations
  const filteredDestinations = mystDestinations.filter((dest) => {
    // Vérifie si la destination est en ligne (status 0)
    if (dest.status !== "En ligne") {
      return false;
    }

    // Vérifie la durée
    if (durationFilter !== null) {
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
    durationFilter !== null ||
    continentFilter.length > 0 ||
    climateFilter.length > 0 ||
    activityFilter.length > 0 ||
    accomodationFilter.length > 0;

  // const openSection = isTablet ? "budget" : openSections;

  return (
    <main id="myst-dest">
      <h2>Nos destinations mystères</h2>
      <section className="container intro-myst-dest">
        <h3>Le voyage commence ici </h3>
        <p>
          Préparez-vous à partir pour une aventure inédite. Pas de noms de
          villes, pas de cartes, juste des indices pour vous guider vers votre
          prochaine grande évasion. Saurez-vous deviner votre prochaine
          destination mystère ?
        </p>
        <p>
          <span>
            La durée de séjour de nos destinations mystères est comprise entre 2
            et 21 jours.
          </span>
        </p>
        <p>
          <span>
            Total des destinations :{" "}
            {hasFiltersApplied ? filteredCount : totalDestinations}
          </span>
        </p>
        {msg && <p className="message">{msg}</p>}
      </section>
      {(budgetFilter.length > 0 ||
        durationFilter !== null ||
        continentFilter.length > 0 ||
        climateFilter.length > 0 ||
        activityFilter.length > 0 ||
        accomodationFilter.length > 0) && (
        <section className="container filter-summary">
          <p>
            <span>Filtre(s) appliqué(s) :</span>
          </p>
          {budgetFilter.length > 0 && (
            <p>
              <span>Budget :</span> {budgetFilter.join(", ")} €
            </p>
          )}
          {durationFilter !== null && (
            <p>
              <span>Durée :</span> {durationFilter} jours
            </p>
          )}
          {continentFilter.length > 0 && (
            <p>
              <span>Continent :</span> {continentFilter.join(", ")}
            </p>
          )}
          {climateFilter.length > 0 && (
            <p>
              <span>Climat :</span> {climateFilter.join(", ")}
            </p>
          )}
          {activityFilter.length > 0 && (
            <p>
              <span>Activité :</span> {activityFilter.join(", ")}
            </p>
          )}
          {accomodationFilter.length > 0 && (
            <p>
              <span>Hébergement :</span> {accomodationFilter.join(", ")}
            </p>
          )}
        </section>
      )}
      <div
        className={`container ${isTablet ? "design-tablet" : "design-mobile"}`}
      >
        <fieldset className={isTablet ? "tablet-filter" : "mobile-filter"}>
          <legend>Filtrer par :</legend>
          <section className={openSections === "budget" ? "active-filter" : ""}>
            <h4
              onClick={() => {
                toggleSection("budget");
              }}
            >
              Budget par jour/personne
            </h4>
            {isTablet || openSections === "budget" ? (
              <div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="budget-50-100"
                    name="budget-50-100"
                    value="50-100"
                    onChange={handleBudgetChange}
                    checked={budgetFilter.includes("50-100")}
                  />
                  <label htmlFor="budget-50-100">50 - 100 €</label>
                </div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="budget-100-150"
                    name="budget-100-150"
                    value="100-150"
                    onChange={handleBudgetChange}
                    checked={budgetFilter.includes("100-150")}
                  />
                  <label htmlFor="budget-100-150">100 - 150 €</label>
                </div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="budget-150-200"
                    name="budget-150-200"
                    value="150-200"
                    onChange={handleBudgetChange}
                    checked={budgetFilter.includes("150-200")}
                  />
                  <label htmlFor="budget-150-200">150 - 200 €</label>
                </div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="budget-200-300"
                    name="budget-200-300"
                    value="200-300"
                    onChange={handleBudgetChange}
                    checked={budgetFilter.includes("200-300")}
                  />
                  <label htmlFor="budget-200-300">200 - 300 €</label>
                </div>
              </div>
            ) : null}
          </section>
          <section
            className={openSections === "duration" ? "active-filter" : ""}
          >
            <h4 onClick={() => toggleSection("duration")}>
              Durée du séjour (jours)
            </h4>
            {isTablet || openSections === "duration" ? (
              <div>
                <div className="input-label">
                  <label htmlFor="duration">Durée :</label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={durationFilter || ""}
                    onChange={handleDurationChange}
                  />
                </div>
              </div>
            ) : null}
          </section>
          <section
            className={openSections === "continent" ? "active-filter" : ""}
          >
            <h4 onClick={() => toggleSection("continent")}>Continent</h4>
            {isTablet || openSections === "continent" ? (
              <div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="Europe"
                    name="Europe"
                    value="Europe"
                    onChange={handleContinentChange}
                    checked={continentFilter.includes("Europe")}
                  />
                  <label htmlFor="Europe">Europe</label>
                </div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="Amérique"
                    name="Amérique"
                    value="Amérique"
                    onChange={handleContinentChange}
                    checked={continentFilter.includes("Amérique")}
                  />
                  <label htmlFor="Amérique">Amérique</label>
                </div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="Asie"
                    name="Asie"
                    value="Asie"
                    onChange={handleContinentChange}
                    checked={continentFilter.includes("Asie")}
                  />
                  <label htmlFor="Asie">Asie</label>
                </div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="Afrique"
                    name="Afrique"
                    value="Afrique"
                    onChange={handleContinentChange}
                    checked={continentFilter.includes("Afrique")}
                  />
                  <label htmlFor="Afrique">Afrique</label>
                </div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="Océanie"
                    name="Océanie"
                    value="Océanie"
                    onChange={handleContinentChange}
                    checked={continentFilter.includes("Océanie")}
                  />
                  <label htmlFor="Océanie">Océanie</label>
                </div>
              </div>
            ) : null}
          </section>
          <section
            className={openSections === "climate" ? "active-filter" : ""}
          >
            <h4 onClick={() => toggleSection("climate")}>Climat</h4>
            {isTablet || openSections === "climate" ? (
              <div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="Chaud et ensoleillé"
                    name="Chaud et ensoleillé"
                    value="Chaud et ensoleillé"
                    onChange={handleClimateChange}
                    checked={climateFilter.includes("Chaud et ensoleillé")}
                  />
                  <label htmlFor="Chaud et ensoleillé">
                    Chaud et ensoleillé
                  </label>
                </div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="Tempéré et doux"
                    name="Tempéré et doux"
                    value="Tempéré et doux"
                    onChange={handleClimateChange}
                    checked={climateFilter.includes("Tempéré et doux")}
                  />
                  <label htmlFor="Tempéré/doux">Tempéré et doux</label>
                </div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="Frais"
                    name="Frais"
                    value="Frais"
                    onChange={handleClimateChange}
                    checked={climateFilter.includes("Frais")}
                  />
                  <label htmlFor="Frais">Frais</label>
                </div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="Humide"
                    name="Humide"
                    value="Humide"
                    onChange={handleClimateChange}
                    checked={climateFilter.includes("Humide")}
                  />
                  <label htmlFor="Humide">Humide</label>
                </div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="Hivernal"
                    name="Hivernal"
                    value="Hivernal"
                    onChange={handleClimateChange}
                    checked={climateFilter.includes("Hivernal")}
                  />
                  <label htmlFor="Hivernal">Hivernal</label>
                </div>
              </div>
            ) : null}
          </section>
          <section
            className={openSections === "activity" ? "active-filter" : ""}
          >
            <h4 onClick={() => toggleSection("activity")}>Activité physique</h4>
            {isTablet || openSections === "activity" ? (
              <div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="Relax"
                    name="Relax"
                    value="Relax"
                    onChange={handleActivityChange}
                    checked={activityFilter.includes("Relax")}
                  />
                  <label htmlFor="Relax">Relax</label>
                </div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="Modéré"
                    name="Modéré"
                    value="Modéré"
                    onChange={handleActivityChange}
                    checked={activityFilter.includes("Modéré")}
                  />
                  <label htmlFor="Modéré">Modéré</label>
                </div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="Dynamique"
                    name="Dynamique"
                    value="Dynamique"
                    onChange={handleActivityChange}
                    checked={activityFilter.includes("Dynamique")}
                  />
                  <label htmlFor="Dynamique">Dynamique</label>
                </div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="Intensif"
                    name="Intensif"
                    value="Intensif"
                    onChange={handleActivityChange}
                    checked={activityFilter.includes("Intensif")}
                  />
                  <label htmlFor="Intensif">Intensif</label>
                </div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="Aventureux"
                    name="Aventureux"
                    value="Aventureux"
                    onChange={handleActivityChange}
                    checked={activityFilter.includes("Aventureux")}
                  />
                  <label htmlFor="Aventureux">Aventureux</label>
                </div>
              </div>
            ) : null}
          </section>
          <section
            className={openSections === "accomodation" ? "active-filter" : ""}
          >
            <h4 onClick={() => toggleSection("accomodation")}>Hébergement</h4>
            {isTablet || openSections === "accomodation" ? (
              <div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="Classique et Confortable"
                    name="Classique et Confortable"
                    value="Classique et Confortable"
                    onChange={handleAccomodationChange}
                    checked={accomodationFilter.includes(
                      "Classique et Confortable"
                    )}
                  />
                  <label htmlFor="Classique et Confortable">
                    Classique et Confortable
                  </label>
                </div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="Nature et Authentique"
                    name="Nature et Authentique"
                    value="Nature et Authentique"
                    onChange={handleAccomodationChange}
                    checked={accomodationFilter.includes(
                      "Nature et Authentique"
                    )}
                  />
                  <label htmlFor="Nature et Authentique">
                    Nature et Authentique
                  </label>
                </div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="Économique et Pratique"
                    name="Économique et Pratique"
                    value="Économique et Pratique"
                    onChange={handleAccomodationChange}
                    checked={accomodationFilter.includes(
                      "Économique et Pratique"
                    )}
                  />
                  <label htmlFor="Économique et Pratique">
                    Économique et Pratique
                  </label>
                </div>
                <div className="input-label">
                  <input
                    type="checkbox"
                    id="Multi-hébergements"
                    name="Multi-hébergements"
                    value="Multi-hébergements"
                    onChange={handleAccomodationChange}
                    checked={accomodationFilter.includes("Multi-hébergements")}
                  />
                  <label htmlFor="Multi-hébergements">Multi-hébergements</label>
                </div>
              </div>
            ) : null}
          </section>
        </fieldset>
        <section className="info-dest">
          {filteredDestinations.map((mystDest) => (
            <article key={mystDest.id}>
              <h4>{mystDest.title}</h4>
              <img
                src={`http://localhost:9000/img/upload-MystDest/${mystDest.image}`}
                alt={mystDest.alt}
              />
              <div>
                <p>
                  <span>Budget par jour/personne :</span> {mystDest.budget} €
                </p>
                <p>
                  <span>Durée :</span> {mystDest.minDuration} à{" "}
                  {mystDest.maxDuration} jours
                </p>
                <Link
                  to={`/myst-destination/${mystDest.id}`}
                  onClick={scrollToTop}
                >
                  En savoir plus
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default MystDest;
