const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.url} New request recieved on my server\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Welcome to Homepage");
        break;
      case "/dashboard":
        const username = myUrl.query.username;
        res.end(`Hi ${username}, Welcome to Dashboard`);
        break;
      case "/search":
        const search_query = myUrl.query.search_query;
        res.end(`Results for ${search_query}`);
        break;
      default:
        res.end("404 Not Found");
    }
  });
});

myServer.listen(8000, () => console.log("my server started"));
