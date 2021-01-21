const config = require("config");
const { Role } = require("../models/role");

module.exports = async function (req, res, next) {
  if (!config.get("requiresAuth")) return next();
  if (req.user.role.name !== "Customer")
    return res.status(403).send("Access denied.");

  next();
};
