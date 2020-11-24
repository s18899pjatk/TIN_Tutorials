const express = require("express");
const router = express.Router();
const { info, updateData } = require("../store/personalInfoStore");

router.get("/", (req, res) => {
  res.render("jsondata", { info });
});

router.post("/", (req, res) => {
  const { name, surname, age } = req.body;
  if (!name || !surname || !age) res.send(400, "Invalid JSON input");
  updateData(name, surname, age);
  res.json(info);
});

module.exports = router;
