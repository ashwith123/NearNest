const User=require("./models/userModel");


const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  next();
};

module.exports = {requireAuth};