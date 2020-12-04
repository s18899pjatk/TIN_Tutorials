const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

const PORT = 3000;

const calculator = require("./routes/calculator");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", calculator);

app.listen(PORT, () => console.log("Listening on port " + PORT));
