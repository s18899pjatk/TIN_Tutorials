const express = require("express");
const router = express.Router();
const auth = require("../store/authStore");

router.get("/", (req, res) => res.render("form.ejs", { auth }));

module.exports = router;
