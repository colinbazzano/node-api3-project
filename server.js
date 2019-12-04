const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl} at ${Date.now()}`);
  next();
}

server.use(express.json());
server.use(logger);

module.exports = server;
