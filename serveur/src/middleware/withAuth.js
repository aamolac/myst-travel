const withAuth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.status(401).json({ msg: "Utilisateur non authentifié" });
};

export default withAuth;
