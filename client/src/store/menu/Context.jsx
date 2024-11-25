import { createContext, useState } from "react";

// Création du contexte pour partager l'état du menu entre plusieurs composants
const MenuContext = createContext();

function MenuProvider({ children }) {
  // crée une variable d'état pour gérer si le menu est ouvert ou fermé
  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour basculer l'état du menu (ouvert ou fermé)
  function toggleMenu() {
    setIsOpen(!isOpen); // Change la valeur de isOpen : si c'est true, ça devient false, et vice versa
  }

  return (
    // Fournit les valeurs isOpen et toggleMenu à tous les composants enfants via MenuContext.Provider
    <MenuContext.Provider
      value={{
        isOpen, // L'état actuel du menu (ouvert ou fermé)
        toggleMenu, // La fonction qui permet de basculer entre ouvert et fermé
      }}
    >
      {/*// children est un prop qui contient tous les composants enfants de ce composant Provider*/}
      {children}
    </MenuContext.Provider>
  );
}
export { MenuContext };
export default MenuProvider;
