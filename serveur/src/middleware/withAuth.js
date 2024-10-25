const withAuth = (req, res, next) => {
  console.log("Middleware connexion !!!", req.session);

  if (req.session.user) {
    console.log("Utilisateur authentifié :", req.session.user);
    return next();
  }
  console.log("Utilisateur non authentifié");
  res.status(401).json({ msg: "Utilisateur non authentifié" });
};

export default withAuth;
