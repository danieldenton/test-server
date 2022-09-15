const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../models");

// POST /users/register -- CREATE a new user
router.post("/register", async (req, res) => {
  try {
    // check if user exists
    const userCheck = await db.User.findOne({
      email: req.body.email,
    });

    if (userCheck) return res.status(409).json({ msg: "user exists already" });

    // hash the password
    const salt = 12;
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // create the user
    const newUser = await db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });
    // create a jwt payload to sen to client
    const payload = {
      name: newUser.name,
      email: newUser.email,
      id: newUser._id,
    };
    // sign the jwt and send it
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(503).json({ msg: "server fail" });
  }
});

// POST /users/login -- validate login credentials
router.post("/login", async (req, res) => {
  // try to find the user in the db
  try {
    const foundUser = await db.User.findOne({
      email: req.body.email,
    });
    // if the user isn't found -- send a message back
    if (!foundUser)
      return res.status(400).json({
        msg: "invalid login credentials",
      });
    // check the req.body against the password in the db
    const matchedPasswords = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    console.log(matchedPasswords);
    // if the provided info does not match -- send back an error and return
    if (!matchedPasswords)
      return res.status(400).json({ msg: "invalid login credentials" });
    // create a jwt payload
    const payload = {
      name: foundUser.name,
      email: foundUser.email,
      id: foundUser.id,
    };
    // sign the jwt
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 600 * 60,
    });
    // send it back
    res.json({ token });
  } catch (err) {
    console.log(err);
  }
});

// GET /users/auth-locked -- ex of checking a jwt and not serving data unless jwt is valid
router.get("/auth-locked", (req, res) => {
  res.send("validate token");
});

module.exports = router;
