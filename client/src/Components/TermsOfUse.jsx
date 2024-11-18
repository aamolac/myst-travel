import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function TermsOfUse() {
  const navigate = useNavigate();

  return (
    <main id="terms-of-use">
      <button onClick={() => navigate(-1)} title="Retour à la page précédente">
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </button>
      <div className="terms-container">
        <h2>Conditions générales d'utilisation</h2>

        <section>
          <h3>1. Présentation du site</h3>
          <p>
            Le site Myst'Travel est une agence de voyages en ligne qui propose
            des expériences de voyages mystères. En accédant et en utilisant
            notre site, vous acceptez sans réserve les présentes conditions
            générales d'utilisation.
          </p>
        </section>

        <section>
          <h3>2. Acceptation des conditions d'utilisation</h3>
          <p>
            L'accès et l'utilisation du site Myst'Travel sont soumis à
            l'acceptation des présentes Conditions Générales d'Utilisation
            (CGU). En naviguant sur notre site, vous acceptez de vous conformer
            à ces conditions. Si vous n'acceptez pas ces conditions, veuillez ne
            pas utiliser notre site.
          </p>
        </section>

        <section>
          <h3>3. Services proposés</h3>
          <p>
            Myst'Travel offre aux utilisateurs la possibilité de découvrir des
            destinations mystères et de créer des voyages sur-mesure. Les
            informations présentes sur le site sont fournies à titre indicatif
            et peuvent être modifiées sans préavis.
          </p>
        </section>

        <section>
          <h3>4. Inscription et création de compte</h3>
          <p>
            L'accès à certains services, tels que la personnalisation de voyages
            ou la soumission d'avis, nécessite la création d'un compte
            utilisateur. Lors de la création de ce compte, vous vous engagez à
            fournir des informations exactes, complètes et à jour. Vous êtes
            responsable de la confidentialité de votre identifiant et mot de
            passe et vous vous engagez à ne pas les partager avec des tiers.
          </p>
        </section>

        <section>
          <h3>5. Protection des données personnelles</h3>
          <p>
            Conformément à la législation en vigueur, et notamment au Règlement
            Général sur la Protection des Données (RGPD), Myst'Travel s'engage à
            protéger la vie privée des utilisateurs et la confidentialité de
            leurs données personnelles. Pour en savoir plus, consultez notre{" "}
            <a href="/privacy-policy">Politique de confidentialité</a>.
          </p>
        </section>

        <section>
          <h3>6. Propriété intellectuelle</h3>
          <p>
            Le contenu du site Myst'Travel, incluant mais non limité aux textes,
            graphiques, images, logos, et vidéos, est protégé par des droits de
            propriété intellectuelle. Toute reproduction, distribution,
            modification ou utilisation de ces éléments sans autorisation écrite
            préalable est strictement interdite.
          </p>
        </section>

        <section>
          <h3>7. Limitation de responsabilité</h3>
          <p>
            Myst'Travel s'efforce de fournir des informations précises et à
            jour. Toutefois, nous ne pouvons être tenus responsables des
            erreurs, omissions, ou inexactitudes présentes sur le site, ainsi
            que des interruptions de service ou autres problèmes techniques.
          </p>
        </section>

        <section>
          <h3>8. Utilisation du site</h3>
          <p>
            Les utilisateurs s'engagent à utiliser le site conformément aux lois
            et règlements en vigueur, et à ne pas porter atteinte aux droits de
            tiers. Tout comportement illégal, frauduleux ou abusif est
            strictement interdit.
          </p>
        </section>

        <section>
          <h3>9. Modification des CGU</h3>
          <p>
            Myst'Travel se réserve le droit de modifier les présentes CGU à tout
            moment. Les modifications prendront effet dès leur publication sur
            le site. Il est conseillé aux utilisateurs de consulter
            régulièrement cette page.
          </p>
        </section>

        <section>
          <h3>10. Loi applicable et juridiction compétente</h3>
          <p>
            Les présentes CGU sont régies par la loi française. En cas de litige
            relatif à leur interprétation ou à leur exécution, les tribunaux
            français seront seuls compétents.
          </p>
        </section>

        <section>
          <h3>11. Contact</h3>
          <p>
            Pour toute question relative aux présentes Conditions Générales
            d'Utilisation, vous pouvez nous contacter à l'adresse suivante :{" "}
            <a href="mailto:contact@myst-travel.com">contact@myst-travel.com</a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}

export default TermsOfUse;
