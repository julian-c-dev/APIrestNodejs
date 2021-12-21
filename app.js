var express = require("express");
var mysql = require("mysql");

var app = express();

app.get("/", function (req, res) {
  res.send("Ruta Inicio");
});

app.listen("3000", function () {
  console.log("Server up");
});
