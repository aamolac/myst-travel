import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <main id="home">
      <h2 className="welcome">Bienvenue chez Myst’Travel</h2>

      <section className="presentation">
        <p>
          {" "}
          <span>Le voyage est une aventure</span>, mais que se passerait-il si{" "}
          <span>
            vous laissiez complètement tomber la carte et l’itinéraire ?{" "}
          </span>
        </p>
        <p>
          Si, pour une fois,{" "}
          <span>vous laissiez l’inconnu prendre le dessus ?</span>
        </p>
        <p>
          Chez <span>Myst’Travel</span>, nous croyons que{" "}
          <span>
            les plus belles aventures commencent là où les plans s'arrêtent.
          </span>
          Oubliez les itinéraires prédéfinis et laissez-vous guider par
          l'excitation de l'inattendu. Un voyage où{" "}
          <span>chaque étape est une découverte</span>, où la destination
          elle-même reste un <span>mystère jusqu’au dernier moment</span>.
        </p>
        <img
          src="/src/assets/images/home/mountains-view.webp"
          alt="Un homme en haut d'une montagne regardant la vue."
        />
      </section>
      <section>
        <h3>Comment ça marche ?</h3>
        <div className="offer">
          <div>
            <p>
              Que{" "}
              <span>
                vous rêviez de plages ensoleillées, d'aventures en montagne ou
                de week-ends culturels
              </span>
              , nous avons une sélection de destinations prêtes à vous
              surprendre !
            </p>
            <Link to="/myst-destination">Nos destinations mystères</Link>
          </div>
          <div>
            <p>
              <span>Vous ne voulez pas choisir ?</span> Remplissez simplement
              notre formulaire et nous prendrons tout en charge !
            </p>
            <Link to="/customized-trip">Surprenez-Moi</Link>
          </div>
        </div>
      </section>

      <section className="mystery">
        <h3>
          <FontAwesomeIcon icon={faMagnifyingGlass} /> Pourquoi choisir le
          mystère ?
        </h3>
        <p>
          Les plus belles découvertes ne sont pas planifiées. Le simple fait de{" "}
          <span>ne pas savoir où vous vous réveillerez demain</span> apporte une{" "}
          excitation unique, une légèreté d’esprit et un goût pour l’aventure.
          Avec Myst'Travel, chaque voyage est une{" "}
          <span>expérience nouvelle et stimulante</span>. Nous vous garantissons
          des destinations uniques, une immersion totale dans l'inconnu et une{" "}
          <span>aventure que vous n'oublierez jamais</span>.
        </p>
        <img
          src="/src/assets/images/home/boat-in-sea.webp"
          alt="Une barque sans personne sur la mer"
        />
      </section>

      <section className="destination-escape">
        <div>
          <h3>Des destinations pour s’évader</h3>
          <p>
            Des <span>villes vibrantes</span> où{" "}
            <span>l’histoire se mêle à la modernité</span>, aux{" "}
            <span>plages isolées</span> où
            <span>le temps semble s’être arrêté</span>, en passant par des{" "}
            <span>montagnes majestueuses</span> qui vous reconnectent avec la
            nature. Chaque destination est soigneusement choisie pour
            correspondre à vos envies, tout en{" "}
            <span>conservant la surprise</span>.
          </p>
        </div>
      </section>

      <section className="ready-for-adventure">
        <div>
          <h3>Prêt pour l'aventure ?</h3>
          <p>
            La vie est trop courte pour{" "}
            <span>toujours rester dans sa zone de confort</span>. Embarquez pour
            une <span>expérience unique</span> qui changera votre vision du
            voyage… et peut-être même de la vie.
          </p>
        </div>
        <img
          src="/src/assets/images/home/scooter-family.webp"
          alt="Une famille heureuse sur un scooter jaune, des palmiers le long de la route"
        />
      </section>
    </main>
  );
}

export default Home;
