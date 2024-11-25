import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function LegalInformation() {
  return (
    <main className="legals-docs">
      <button onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </button>
      <h2>Mentions légales</h2>
      <section>
        <h3>Éditeur du site</h3>
        <p>Le site Myst'Travel est édité par :</p>
        <ul>
          <li>Nom : Myst'Travel</li>
          <li>Adresse : 15 avenue des explorateurs, 75008 Paris</li>
          <li>Téléphone : +33 1 23 45 67 89</li>
          <li>
            Email :
            <a href="mailto:contact@myst-travel.com">contact@myst-travel.com</a>
          </li>
          <li>SIRET : [Numéro SIRET, si applicable]</li>
          <li>Directeur de la publication : Annaïg MOLAC</li>
        </ul>
      </section>

      <section>
        <h3>Hébergement</h3>
        <p>Le site est hébergé par :</p>
        <ul>
          <li>Nom : [Nom de l’hébergeur]</li>
          <li>Adresse : [Adresse complète de l’hébergeur]</li>
          <li>Téléphone : [Numéro de téléphone de l’hébergeur]</li>
        </ul>
      </section>

      <section>
        <h3>Données personnelles</h3>
        <p>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), vous disposez d’un droit d’accès, de modification et de
          suppression de vos données personnelles.
          <p>
            Pour toute demande, contactez-nous à :
            <a href="mailto:contact@myst-travel.com">contact@myst-travel.com</a>
            .
          </p>
        </p>
      </section>
    </main>
  );
}

export default LegalInformation;
