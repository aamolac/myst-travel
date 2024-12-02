function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      // si dispatch type:"LOGIN" alors retourne un objet avec isLogged à true et l'email passé en payload
      return {
        ...state,
        isLogged: true,
        user: action.payload,
      };
    case "REGISTER":
      // Ajouter une logique pour l'enregistrement si nécessaire
      return state;

    case "LOGOUT":
      return {
        ...state,
        isLogged: false,
        user: null,
      };

    default:
      console.log("Action inconnue");
      return state;
  }
}

export default userReducer;
