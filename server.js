const express = require("express");

const userRouter = require("./users/userRouter");

const server = express();

const event = new Date();

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl} at ${event.toISOString()}`);
  next();
}

server.use(express.json());
server.use(logger);
server.use("/api/users", userRouter);

module.exports = server;
