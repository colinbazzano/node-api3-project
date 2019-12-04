const express = require("express");
const userDb = require("./userDb");
const postDb = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUserId, validateUser, (req, res) => {
  const userData = req.body;
  userDb
    .insert(userData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error adding the user" });
    });
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", validateUserId, (req, res) => {
  const userData = req.body;
  userDb
    .get(userData)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving the users" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  userDb
    .getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving user" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const id = req.params.id;

  userDb
    .getById(id)
    .then(user => {
      user
        ? userDb
            .getUserPosts(id)
            .then(post => {
              res.status(200).json(post);
            })
            .catch(error => {
              console.log(error);
              res.status(500).json({ message: "Could not retrieve posts." });
            })
        : res
            .status(404)
            .json({ message: "User with the specified ID does not exist." });
    })
    .catch(error => {
      res.status(500).json({ message: "Could not retrieve user." });
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;

  const user = userDb.getById(id);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(400).json({ message: "invalid user id" });
  }
}

function validateUser(req, res, next) {
  const userData = req.body;
  if (!userData) {
    res.status(400).json({ message: "missing user data" });
  } else if (!userData.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const postData = req.body;
  if (!postData) {
    res.status(400).json({ message: "missing post data" });
  } else if (!postData.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
