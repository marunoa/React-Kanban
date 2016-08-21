'use strict';

const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("sequelize");
const db = require('./models');
const Card = db.Cards;
const User = db.user;
var CONFIG = require('./config/config');

var app = express();

app.set("port", (process.env.PORT || 8080));

app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.get("/api/cards", function (req, res, next) {
  Card.findAll().then(function (cards) {
    res.json(cards);
  });
});

app.post('/api/cards', function (req, res) {
  Card.create({
    title: req.body.title,
    priority: req.body.priority,
    status: req.body.status,
    createdBy: req.body.createdBy,
    assignedTo: req.body.assignedTo
  }).then(function (data) {
    res.json(data);
  });
});

app.listen(app.get("port"), function () {
  console.log(`Server is listening on port ${app.get("port")}`);
  db.sequelize.sync();
});