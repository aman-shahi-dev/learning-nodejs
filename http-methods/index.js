const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  console.log("request recieved");
  switch (req.url) {
    case "/":
      res.end("This is the home page");
      break;
    case "/signup":
      if (req.method === "GET") {
        res.end("This is a signup form");
      } else if (req.method === "POST") {
        res.end(`You are sending a ${req.method} request for signing up`);
      } else if (req.method === "PUT") {
        res.end(`This is a ${req.method} request`);
      } else if (req.method === "PATCH") {
        res.end(`This is a ${req.method} request`);
      } else if (req.method === "DELETE") {
        res.end(`This is a ${req.method} request`);
      }
      break;
    default:
      res.end("404 Not Found");
  }
});

server.listen(8000, () => {
  console.log("Server Started!");
});
