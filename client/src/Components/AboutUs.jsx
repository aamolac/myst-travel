import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faQuestionCircle,
  faHiking,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

function AboutUs() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <main id="about-us" aria-label="Page à propos de nous">
      <nav
        className="menu-accessible"
        role="navigation"
        aria-label="Menu accessible avec tabulation"
      >
        <a href="#small-presentation">Présentation</a>
        <a href="#why-myst-travel">Pourquoi Myst'Travel ?</a>
        <a href="#our-team">Notre équipe</a>
        <a href="#number">Les chiffres de Myst'Travel</a>
        <a href="#trip-with-us">Faites partie du voyage</a>
      </nav>
      <h2 className="about-title">À propos de nous</h2>
      <section
        className="container"
        id="small-presentation"
        aria-label="Présentation"
      >
        <div>
          <p>
            <span>
              Myst'Travel, créée en 2016, est née de la passion pour l’aventure
              et la conviction que les meilleures expériences sont souvent
              celles que l’on n’attend pas.
            </span>
          </p>
          <p>
            Fondée par des passionnés de voyage avec des années d'expérience,{" "}
            <span>
              notre agence a pour mission de réinventer la manière dont vous
              explorez le monde
            </span>
            .
          </p>
        </div>
        <img
          src="/src/assets/images/about-us/city-color-with-boat.webp"
          alt="Des maisons colorées, avec un courant d'eau qui traverse la ville."
        />
      </section>
      <section id="why-myst-travel" aria-label="Pourquoi Myst'Travel ?">
        <div className="container">
          <div>
            <FontAwesomeIcon icon={faPlane} aria-hidden="true" />
            <h3>L'Art de l'Évasion</h3>
            <p>
              Chez Myst'Travel, nous sommes convaincus que chaque voyage doit
              être une expérience unique. Nous imaginons des aventures
              étonnantes qui vous plongent dans l’inconnu, offrant une véritable
              évasion et des moments authentiques.
            </p>
          </div>
          <div>
            <FontAwesomeIcon icon={faQuestionCircle} aria-hidden="true" />
            <h3>Le Mystère, Notre Signature</h3>
            <p>
              Pourquoi révéler tout avant de partir ? Nous pensons que le
              mystère rend chaque expérience plus intense. En ne dévoilant pas
              la destination, nous réinjectons de la magie dans le voyage.
            </p>
          </div>
          <div>
            <FontAwesomeIcon icon={faHiking} aria-hidden="true" />
            <h3>Réveillez votre Esprit d’Aventure</h3>
            <p>
              Le mystère stimule la curiosité et la spontanéité. Nos voyages
              vous permettent de lâcher prise, d'embrasser l'inconnu et de
              renouer avec l’aventure, loin de la routine quotidienne.
            </p>
          </div>
          <div>
            <FontAwesomeIcon icon={faUsers} aria-hidden="true" />
            <h3>L'Aventure Accessible à Tous</h3>
            <p>
              Que vous soyez un grand explorateur ou un voyageur débutant, nos
              voyages mystères sont faits pour tous. Sortez de votre zone de
              confort en toute simplicité et laissez-vous surprendre.
            </p>
          </div>
        </div>
      </section>
      <section id="our-team" className="container">
        <h3>Notre équipe</h3>
        <div>
          <p>
            Derrière chaque voyage mystère, il y a une équipe dédiée de
            professionnels du voyage qui travaillent sans relâche pour
            sélectionner des destinations sûres, captivantes, et parfaitement
            adaptées à vos préférences. Qu’il s’agisse d’un week-end en Europe
            ou d’une aventure plus lointaine, nous faisons en sorte que chaque
            voyage devienne une expérience unique et surprenante.
          </p>
          <img
            src="/src/assets/images/about-us/peoples-jump-beach.webp"
            alt="Un groupe de personne qui saute sur le sable, avec la mer derrière"
          />
        </div>
      </section>
      <section id="number">
        <h3>Quelques chiffres qui parlent d’eux-mêmes :</h3>
        <ul>
          <li>
            <span>20+</span> destinations dans le monde entier
          </li>
          <li>
            <span>300+</span> clients satisfaits chaque année
          </li>
          <li>
            <span>200</span> voyages mystères organisés
          </li>
          <li>
            <span>100%</span> d’aventures uniques
          </li>
        </ul>
      </section>

      <section id="trip-with-us" className="container">
        <h3>Faites partie du voyage</h3>
        <div>
          <div>
            <p>
              Parce que l'inconnu est une invitation au rêve, Myst'Travel vous
              promet plus qu'une destination : une expérience qui vous
              transformera. Chaque aventure est soigneusement conçue pour
              éveiller votre curiosité et vous offrir des souvenirs
              inoubliables. <span>Prêt à vous laisser surprendre ? </span>
            </p>
            <Link
              to="/myst-destination"
              onClick={scrollToTop}
              aria-label="Aller sur la page des destinations mystères"
            >
              Nos destinations mystères
            </Link>
            <Link
              to="/customized-trip"
              onClick={scrollToTop}
              aria-label="Aller sur la page de voyages sur-mesure"
            >
              Notre destination sur-mesure
            </Link>
          </div>
          <img
            src="/src/assets/images/about-us/plane-and-moutain.webp"
            alt="Un avion survolant le ciel, au loin des montagnes enneigées"
          />
        </div>
      </section>
    </main>
  );
}

export default AboutUs;
