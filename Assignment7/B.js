var http = require("http");
const fs = require("fs");

const PORT = 8000;
const PATH = "./";
var watching = false; // preventing fs.watch being called several times after modifying
http
  .createServer((req, res) => {
    res.end("Waiting for requests...");
    fs.watch(PATH, (eventType, filename) => {
      if (watching) return;
      watching = true;

      try {
        readFile(filename);
      } catch (error) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Server error");
      }

      setTimeout(() => {
        watching = false;
      }, 100);
    });
  })
  .listen(PORT);

const readFile = (filename) => {
  fs.readFile(filename, (err, data) => {
    if (err) throw err;
    console.log(data.toString());
  });
};

console.log("server is running on port: " + PORT);
