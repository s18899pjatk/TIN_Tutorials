const config = require("config");

module.exports = async function (req, res, next) {
  if (!config.get("requiresAuth")) return next();
  if (req.user.role.name !== "Admin")
    return res.status(403).send("Access denied.");

  next();
};
