var http = require("http");
const url = require("url");

const PORT = 8000;

var server = http.createServer((req, res) => {
  const urlObj = url.parse(req.url, true);
  const num1 = Number(urlObj.query.num1);
  const num2 = Number(urlObj.query.num2);
  let result = 0;

  if (num1 && num2) {
    if (urlObj.pathname === "/add") {
      result = num1 + num2;
    } else if (urlObj.pathname === "/sub") {
      result = num1 - num2;
    } else if (urlObj.pathname === "/mul") {
      result = num1 * num2;
    } else if (urlObj.pathname === "/div") {
      result = num1 / num2;
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end(
        "Pathname of the url does not containing appropriate operation name"
      );
    }
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("The result of the operation is: " + result);
  } else {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Provide the correct query parameters in the path");
  }
});

server.listen(PORT);
console.log("server is running on port: " + PORT);
