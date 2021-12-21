var express = require("express");
var mysql = require("mysql");

var app = express();

// set the parameters of the conection
var conection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "articlesDB",
});

// testing the conection
conection.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("Conection success");
  }
});

app.get("/", function (req, res) {
  res.send("ROOT Innit");
});

app.listen("3000", function () {
  console.log("Server up");
});
