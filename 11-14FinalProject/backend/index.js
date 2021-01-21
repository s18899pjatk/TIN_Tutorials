const express = require("express");
const app = express();
const config = require("config");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./routes/auth");
const users = require("./routes/users");
const products = require("./routes/products");
const purchases = require("./routes/purchases");
const categories = require("./routes/categories");
const db = config.get("db");

const port = 8000 || config.get("port");

app.use(cors());
app.use("/auth", jsonParser, auth);
app.use("/users", jsonParser, users);
app.use("/products", jsonParser, products);
app.use("/purchases", jsonParser, purchases);
app.use("/categories", jsonParser, categories);

if (!config.get("jwtPrivateKey")) {
  throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
}

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to ${db}...`))
  .catch((err) => console.error(err));

const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
