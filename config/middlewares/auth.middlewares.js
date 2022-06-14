function isLoggedIn(req, res, next) {
    const user = req.session.user;
    if (user) {
      return next();
    }
    res
      .status(400)
      .json({ message: "you need to be logged in to access this resource" });
  }
  
  function isNotLoggedIn(req, res, next) {
    const user = req.session.user;
    if (!user) {
      return next();
    }
    res
      .status(400)
      .json({ message: "you need not to be logged in to access this resource" });
  }
  
  module.exports = { isLoggedIn, isNotLoggedIn };