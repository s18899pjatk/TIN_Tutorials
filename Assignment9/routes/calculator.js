const express = require("express");
const { calculate } = require("../utilities/calculator");
const router = express.Router();

router.post("/calc.json", (req, res) => {
  const { num1, num2, op } = req.body;

  if (typeof num1 !== "number" || typeof num2 !== "number") {
    res.json(JSON.stringify("Wrong input"));
  } else {
    let c = calculate(num1, num2, op);
    res.json(JSON.stringify(c));
  }
});

module.exports = router;
