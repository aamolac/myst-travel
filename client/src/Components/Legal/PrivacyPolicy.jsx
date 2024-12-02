import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <main className="container legals-docs">
      <button onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </button>
      <h2>Politique de confidentialité</h2>

      <section>
        <h3>1. Introduction</h3>
        <p>
          Chez Myst'Travel, nous respectons votre vie privée et nous nous
          engageons à protéger les données personnelles que vous partagez avec
          nous. La présente politique de confidentialité explique comment nous
          collectons, utilisons, et protégeons vos données personnelles lorsque
          vous utilisez notre site.
        </p>
      </section>

      <section>
        <h3>2. Données collectées</h3>
        <p>
          Lorsque vous utilisez Myst'Travel, nous collectons différentes
          catégories de données personnelles. Ces données incluent :
        </p>
        <ul>
          <li>
            Informations de compte : prénom, nom, adresse email, et mot de
            passe.
          </li>
          <li>
            Informations de navigation : adresse IP, type de navigateur, pages
            visitées, et durée de la visite.
          </li>
          <li>
            Préférences de voyage : informations fournies via le formulaire de
            personnalisation de voyage (durée, budget, destination souhaitée,
            etc.).
          </li>
        </ul>
      </section>

      <section>
        <h3>3. Utilisation des données collectées</h3>
        <p>Nous utilisons les données collectées aux fins suivantes :</p>
        <ul>
          <li>
            Fournir et personnaliser nos services, tels que la création de
            voyages sur-mesure ou la gestion des réservations.
          </li>
          <li>
            Communiquer avec vous, notamment via des emails concernant les
            offres ou les mises à jour du service.
          </li>
          <li>
            Améliorer la qualité de nos services et l'expérience utilisateur en
            analysant les comportements sur le site.
          </li>
          <li>
            Respecter nos obligations légales, telles que la gestion des
            factures ou la réponse aux demandes des autorités.
          </li>
        </ul>
      </section>

      <section>
        <h3>4. Partage des données</h3>
        <p>
          Nous ne vendons, ni ne louons, ni ne partageons vos données
          personnelles avec des tiers, sauf dans les cas suivants :
        </p>
        <ul>
          <li>
            Prestataires de services : Nous partageons certaines données avec
            des prestataires pour nous aider à fournir nos services (par
            exemple, les services de paiement ou de marketing).
          </li>
          <li>
            Obligations légales : Si la loi l'exige, nous pouvons partager vos
            données avec les autorités compétentes.
          </li>
          <li>
            En cas de fusion ou acquisition : Vos données pourraient être
            transférées à une autre entité en cas de restructuration de
            l'entreprise.
          </li>
        </ul>
      </section>

      <section>
        <h3>5. Sécurité des données</h3>
        <p>
          Nous mettons en œuvre des mesures de sécurité techniques et
          organisationnelles pour protéger vos données contre tout accès non
          autorisé, divulgation, modification ou destruction. Toutefois, malgré
          nos efforts, aucune méthode de transmission ou de stockage
          électronique n'est totalement sécurisée, et nous ne pouvons garantir
          une sécurité absolue.
        </p>
      </section>

      <section>
        <h3>6. Vos droits</h3>
        <p>
          En tant qu'utilisateur, vous disposez des droits suivants sur vos
          données personnelles :
        </p>
        <ul>
          <li>
            Droit d'accès : Vous pouvez demander une copie des données que nous
            détenons sur vous.
          </li>
          <li>
            Droit de rectification : Vous pouvez demander la correction des
            données incorrectes ou incomplètes.
          </li>
          <li>
            Droit à l'effacement : Vous pouvez demander la suppression de vos
            données personnelles sous certaines conditions.
          </li>
          <li>
            Droit à la portabilité : Vous pouvez demander que vos données vous
            soient transmises dans un format lisible par machine.
          </li>
          <li>
            Droit d'opposition : Vous pouvez vous opposer au traitement de vos
            données à des fins de marketing direct.
          </li>
          <li>
            Droit à la limitation du traitement : Vous pouvez demander la
            limitation du traitement de vos données dans certaines
            circonstances.
          </li>
        </ul>
        <p>
          Pour exercer ces droits, veuillez nous contacter à l'adresse suivante
          : <a href="mailto:privacy@myst-travel.com">privacy@myst-travel.com</a>
          .
        </p>
      </section>

      <section>
        <h3>7. Conservation des données</h3>
        <p>
          Nous conservons vos données personnelles aussi longtemps que
          nécessaire pour vous fournir nos services, pour respecter nos
          obligations légales, ou pour résoudre des litiges. Lorsque vos données
          ne sont plus nécessaires, nous les supprimons de manière sécurisée.
        </p>
      </section>

      <section>
        <h3>8. Cookies</h3>
        <p>
          Mystery Explorer utilise des cookies pour améliorer l'expérience
          utilisateur. Les cookies sont des fichiers textes stockés sur votre
          appareil qui nous permettent d'analyser votre utilisation du site et
          de vous proposer des fonctionnalités personnalisées. Vous pouvez
          configurer votre navigateur pour refuser les cookies, mais cela
          pourrait affecter certaines fonctionnalités du site.
        </p>
      </section>

      <section>
        <h3>9. Modifications de la politique de confidentialité</h3>
        <p>
          Nous nous réservons le droit de modifier cette politique de
          confidentialité à tout moment. Toute modification sera publiée sur
          cette page et, si les changements sont significatifs, nous vous en
          informerons par email ou via une notification sur notre site.
        </p>
      </section>

      <section>
        <h3>10. Contact</h3>
        <p>
          Si vous avez des questions concernant cette politique de
          confidentialité ou si vous souhaitez exercer vos droits relatifs à vos
          données personnelles, veuillez nous contacter à{" "}
          <a href="mailto:privacy@myst-travel.com">privacy@myst-travel.com</a>.
        </p>
      </section>
    </main>
  );
}

export default PrivacyPolicy;
