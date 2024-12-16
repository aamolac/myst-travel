import { Link } from "react-router-dom";

function Home() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <main id="home" aria-label="Page d'accueil">
      <nav
        className="menu-accessible"
        role="navigation"
        aria-label="Menu accessible avec tabulation"
      >
        <a href="#presentation">Présentation</a>
        <a href="#how-it-works">Comment ça marche ?</a>
        <a href="#why-choose-mystery">Pourquoi choisir le mystère ?</a>
        <a href="#destination-escape">Des destinations pour s’évader</a>
        <a href="#ready-for-adventure">Prêt pour l'aventure ?</a>
      </nav>
      <h2>Bienvenue chez Myst’Travel</h2>

      <section
        className="container"
        aria-label="Présentation"
        id="presentation"
      >
        <p>
          <span>Le voyage est une aventure</span>.
        </p>
        <p>
          Que se passerait-il si vous abandonniez complètement la carte et
          l’itinéraire ? Si, pour une fois, vous laissiez l’inconnu prendre le
          dessus ?
        </p>
        <p>
          Chez Myst’Travel, nous pensions que{" "}
          <span>
            les plus belles aventures commencent là où les plans s'arrêtent.
          </span>
        </p>
        <p>
          Oubliez les itinéraires prédéfinis et laissez-vous guider par
          l'excitation de l'inattendu.
        </p>
        <p>
          <span>
            Un voyage où chaque étape est une découverte, où la destination
            elle-même reste un mystère jusqu’au dernier moment
          </span>
          .
        </p>
      </section>
      <section
        className="container images"
        aria-label="Galerie d'images"
        role="img"
      >
        <img
          src="/src/assets/images/home/mountains-view.webp"
          alt="Un homme en haut d'une montagne regardant la vue."
        />
        <img
          src="/src/assets/images/home/city-italy.webp"
          alt="Une ville au coucher du soleil."
        />
        <img
          src="/src/assets/images/home/elephant-in-desert.webp"
          alt="Un éléphant dans le désert, au lin une chaine de montagne enneigée."
        />
        <img
          src="/src/assets/images/home/city-grece.webp"
          alt="Une ville avec de bâtiments blancs, bord de mer."
        />
        <img
          src="/src/assets/images/home/riziere-asie.webp"
          alt="Des champs de rizières."
        />
      </section>
      <section id="how-it-works">
        <h3>Comment ça marche ?</h3>
        <div className="offer">
          <div aria-label="Nos destinations mystères">
            <h4>Choisissez parmi nos destinations mystères</h4>
            <p>
              Que{" "}
              <span>
                vous rêviez de plages ensoleillées, d'aventures en montagne ou
                de week-ends culturels
              </span>
              , nous avons une sélection de destinations prêtes à vous
              surprendre !
            </p>
            <Link
              to="/myst-destination"
              onClick={scrollToTop}
              aria-label="Aller sur la page des destinations mystères"
              id="myst-dest"
            >
              Nos destinations mystères
            </Link>
          </div>
          <div>
            <h4>Optez pour un voyage sur-mesure</h4>
            <p>
              <span>Vous ne voulez pas choisir ?</span> Remplissez simplement
              notre formulaire et nous organiserons tout pour vous, en fonction
              de vos envies et besoins !
            </p>
            <Link
              to="/customized-trip"
              onClick={scrollToTop}
              aria-label="Aller sur la page de voyages sur-mesure"
              id="cust-trip"
            >
              Surprenez-Moi
            </Link>
          </div>
        </div>
      </section>

      <section id="why-choose-mystery" className="container">
        <h3>Pourquoi choisir le mystère ?</h3>
        <div>
          <p>
            Les plus belles découvertes ne sont pas planifiées. Le simple fait
            de ne pas savoir où vous vous réveillerez demain apporte une
            excitation unique, une légèreté d’esprit et un goût pour l’aventure.
            Avec Myst'Travel, chaque voyage est une{" "}
            <span>expérience nouvelle et stimulante</span>. Nous vous
            garantissons des destinations uniques, une immersion totale dans
            l'inconnu et une <span>aventure que vous n'oublierez jamais</span>.
          </p>
          <img
            src="/src/assets/images/home/desert.webp"
            alt="Un homme regardant au loin sur une dune de sable"
          />
        </div>
      </section>

      <section id="destination-escape">
        <div>
          <h3>Des destinations pour s’évader</h3>
          <p className="container">
            Des villes vibrantes où l’histoire se mêle à la modernité, aux
            plages isolées où le temps semble s’être arrêté, en passant par des
            montagnes majestueuses qui vous reconnectent avec la nature. Chaque
            destination est soigneusement choisie pour correspondre à vos
            envies, tout en conservant la surprise.
          </p>
        </div>
      </section>

      <section id="ready-for-adventure" className="container">
        <h3>Prêt pour l'aventure ?</h3>
        <div>
          <p>
            La vie est trop courte pour{" "}
            <span>toujours rester dans sa zone de confort</span>. Embarquez pour
            une <span>expérience unique</span> qui changera votre vision du
            voyage… et peut-être même de la vie.
          </p>

          <img
            src="/src/assets/images/home/scooter-family.webp"
            alt="Une famille heureuse sur un scooter jaune, des palmiers le long de la route"
          />
        </div>
      </section>
    </main>
  );
}

export default Home;
