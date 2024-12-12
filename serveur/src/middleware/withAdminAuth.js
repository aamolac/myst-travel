const adminAuth = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }
  res.status(401).json({ msg: "Accès refusé" });
};

export default adminAuth;
