import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

function LegalInformation() {
  const navigate = useNavigate();

  return (
    <main
      className="container legals-docs"
      aria-label="Page des mentions légales"
    >
      <nav
        className="menu-accessible"
        role="navigation"
        aria-label="Menu accessible avec tabulation"
      >
        <a href="#site-editor">Éditeur du site</a>
        <a href="#hosting">Hébergement</a>
        <a href="#personal-data">Données personnelles</a>
      </nav>
      <button
        onClick={() => navigate(-1)}
        title="Retour à la page précédente"
        aria-label="Retour à la page précédente"
      >
        <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" /> Retour
      </button>
      <h2>Mentions légales</h2>
      <section id="site-editor">
        <h3>Éditeur du site</h3>
        <p>Le site Myst'Travel est édité par :</p>
        <ul>
          <li>
            <span>Nom :</span> Myst'Travel
          </li>
          <li>
            <span>Adresse :</span> 15 avenue des explorateurs, 75008 Paris
          </li>
          <li>
            <span>Téléphone :</span> +33 1 23 45 67 89
          </li>
          <li>
            <span>Email :</span>{" "}
            <a href="mailto:contact@myst-travel.com">contact@myst-travel.com</a>
          </li>
          <li>
            <span>SIRET :</span> 123 456 789 00012
          </li>
          <li>
            <span>Directeur de la publication :</span> Annaïg MOLAC
          </li>
        </ul>
      </section>

      <section id="hosting">
        <h3>Hébergement</h3>
        <p>Ce site est un projet fictif et n'est pas hébergé actuellement.</p>
      </section>

      <section id="personal-data">
        <h3>Données personnelles</h3>
        <p>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), vous disposez d’un droit d’accès, de modification et de
          suppression de vos données personnelles.
        </p>
        <p>
          Pour toute demande, contactez-nous à :{" "}
          <a
            href="mailto:contact@myst-travel.com"
            aria-label="Envoyer un email à Myst'Travel"
          >
            contact@myst-travel.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}

export default LegalInformation;
