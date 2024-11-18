import { Link } from "react-router-dom";

function Home() {
  return (
    <main id="home">
      <h2>Bienvenue chez Myst’Travel</h2>
      <section>
        <p>
          Le voyage est une aventure, mais que se passerait-il si vous laissiez
          complètement tomber la carte et l’itinéraire ? Si, pour une fois, vous
          laissiez l’inconnu prendre le dessus ? Chez Myst’Travel, nous croyons
          que les plus belles aventures commencent là où les plans s'arrêtent.
          Oubliez les itinéraires prédéfinis et laissez-vous guider par
          l'excitation de l'inattendu. Un voyage où chaque étape est une
          découverte, où la destination elle-même reste un mystère jusqu’au
          dernier moment.
        </p>
      </section>
      <section>
        <h3>Comment ça marche ?</h3>
        <div className="offer">
          <div>
            <p>
              Que vous rêviez de plages ensoleillées, d'aventures en montagne ou
              de week-ends culturels, nous avons une sélection de destinations
              prêtes à vous surprendre !
            </p>
            <Link to="/myst-destination">Nos destinations mystères</Link>
          </div>
          <div>
            <p>
              Vous ne voulez pas choisir ? Remplissez simplement notre
              formulaire et nous prendrons tout en charge !
            </p>
            <Link to="/customized-trip">Surprenez-Moi</Link>
          </div>
        </div>
      </section>

      <section>
        <h3>Pourquoi choisir le mystère ?</h3>
        <p>
          Les plus belles découvertes ne sont pas planifiées. Le simple fait de
          ne pas savoir où vous vous réveillerez demain apporte une excitation
          unique, une légèreté d’esprit et un goût pour l’aventure. Avec
          Myst'Travel, chaque voyage est une expérience nouvelle et stimulante.
          Nous vous garantissons des destinations uniques, une immersion totale
          dans l'inconnu, et une aventure que vous n'oublierez jamais.
        </p>
      </section>

      <section>
        <h3>Des destinations pour s’évader</h3>
        <p>
          Des villes vibrantes où l’histoire se mêle à la modernité, aux plages
          isolées où le temps semble s’être arrêté, en passant par des montagnes
          majestueuses qui vous reconnectent avec la nature. Chaque destination
          est soigneusement choisie pour correspondre à vos envies, tout en
          conservant la surprise.
        </p>
      </section>

      <section>
        <h3>Prêt pour l'aventure ?</h3>
        <p>
          La vie est trop courte pour toujours rester dans sa zone de confort.
          Embarquez pour une expérience unique qui changera votre vision du
          voyage… et peut-être même de la vie.
        </p>
      </section>
    </main>
  );
}

export default Home;
