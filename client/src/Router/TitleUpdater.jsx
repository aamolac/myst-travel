import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "Accueil - Myst'Travel";
        break;
      case "/about-us":
        document.title = "A propos de nous - Myst'Travel";
        break;
      case "/myst-destination":
        document.title = "Destinations mystères - Myst'Travel";
        break;
      case "/customized-trip":
        document.title = "Destination sur-mesure - Myst'Travel";
        break;
      case "/contact":
        document.title = "Nous contacter - Myst'Travel";
        break;
      case "/auth":
        document.title = "Se connecter - Myst'Travel";
        break;
      case "/register":
        document.title = "S'inscrire - Myst'Travel";
        break;
      case "/terms-of-use":
        document.title = "Conditions générales d'utilisation - Myst'Travel";
        break;
      case "/privacy-policy":
        document.title = "Politique de confidentialité - Myst'Travel";
        break;
      case "/legal-information":
        document.title = "Mentions légales - Myst'Travel";
        break;

      //ADMIN
      case "/dashboard":
        document.title = "Tableau de bord - Myst'Travel";
        break;
      case "/dashboard/user":
        document.title = "Gestion des utilisateurs - Myst'Travel";
        break;
      case "/dashboard/myst-destination":
        document.title = "Gestion des destinations mystères - Myst'Travel";
        break;
      case "/dashboard/myst-destination/add":
        document.title = "Ajouter une destination mystère - Myst'Travel";
        break;
      case "/dashboard/customized-trip":
        document.title = "Gestion des voyages sur-mesure - Myst'Travel";
        break;
      case "/dashboard/reservation":
        document.title = "Gestion des réservations - Myst'Travel";
        break;
      case "/dashboard/contact":
        document.title = "Gestion des demandes de contact - Myst'Travel";
        break;
      default:
        document.title = "Myst'Travel";
    }
  }, [location]);
  // Ce composant n'a pas besoin de rendre quoi que ce soit
  return null;
}

export default TitleUpdater;

// Pour les routes suivantes, directement dans la page pour changer dynamiquement avec l'id
// "/myst-destination/:id"
// "/myst-destination/:id/reserve"
// "/dashboard/myst-destination/update/:id"
// "/dashboard/customized-trip/:id"
// "/dashboard/reservation/:id"
// "/dashboard/contact/:id"
