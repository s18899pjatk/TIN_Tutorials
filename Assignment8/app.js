const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = 3000;

const hello = require("./routes/hello");
const form = require("./routes/form");
const formdata = require("./routes/formdata");
const jsondata = require("./routes/jsondata");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", hello);
app.use("/form", form);
app.use("/formdata", formdata);
app.use("/jsondata", jsondata);

app.listen(PORT, () => console.log("Listening on port " + PORT));
