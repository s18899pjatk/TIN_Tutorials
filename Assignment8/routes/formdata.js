const express = require("express");
const router = express.Router();
const { auth, updateData } = require("../store/authStore");

router.get("/", (req, res) => {
  res.render("formdata", { auth });
});

router.post("/", (req, res) => {
  const { login, email, password } = req.body;
  updateData(login, email, password);
  res.redirect("");
});

module.exports = router;
