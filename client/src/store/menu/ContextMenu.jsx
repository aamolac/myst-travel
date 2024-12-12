import { createContext, useState } from "react";

// Création du contexte pour partager l'état du menu entre plusieurs composants
const MenuContext = createContext();

function MenuProvider({ children }) {
  // variable d'état pour gérer si le menu est ouvert ou fermé
  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour basculer l'état du menu (ouvert ou fermé)
  function toggleMenu() {
    // Change la valeur de isOpen : si c'est true, ça devient false, et vice versa
    setIsOpen(!isOpen);
  }

  return (
    // Fournit les valeurs isOpen et toggleMenu à tous les composants
    <MenuContext.Provider
      value={{
        isOpen,
        toggleMenu,
      }}
    >
      {/*// children est un prop qui contient tous les composants enfants de ce composant Provider*/}
      {children}
    </MenuContext.Provider>
  );
}
export { MenuContext };
export default MenuProvider;
