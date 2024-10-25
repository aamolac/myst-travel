const adminAuth = (req, res, next) => {
  console.log("Middleware ADMIN !!!", req.session);

  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }

  res.status(401).json({ msg: "Accès refusé" });
};

export default adminAuth;
