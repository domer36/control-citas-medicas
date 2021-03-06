exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/login");
    }
  };
  
  exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === "ADMIN") {
      next();
    } else {
      res.redirect("/login");
    }
  };