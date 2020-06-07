"use strict";

const express = require("express");
const morgan = require("morgan");

const { users } = require("./data/users");

let currentUser = {};
//utilities
const findUser = (value) => {
  return users.find((user) => Object.values(user).includes(value)) || null;
};
const getFriends = (arr) => {
  return users.filter((user) => arr.includes(user._id));
};
// declare the 404 function
const handleFourOhFour = (req, res) => {
  res.status(404).send("I couldn't find what you're looking for.");
};

const handleHomepage = (req, res) => {
  res.status(200).render("pages/homepage", { users: users });
};

const handleSignin = (req, res) => {
  res.send("ok");
};

const handleProfilePage = (req, res) => {
  const _id = req.params._id;
  const user = findUser(_id);

  res.status(200).render("pages/profile", {
    user: user,
    friends: getFriends(user.friends),
  });
};
// -----------------------------------------------------
// server endpoints
express()
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(express.urlencoded({ extended: false }))
  .set("view engine", "ejs")

  // endpoints
  .get("/", handleHomepage)
  .get("/signin", handleSignin)
  .get("/users/:_id", handleProfilePage)
  // a catchall endpoint that will send the 404 message.
  .get("*", handleFourOhFour)

  .listen(8000, () => console.log("Listening on port 8000"));
