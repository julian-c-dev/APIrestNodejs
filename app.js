var express = require("express");
var mysql = require("mysql");
var cors = require("cors");

var app = express();
app.use(express.json());
app.use(cors());

// * SET the parameters of the conection
var conection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "articlesDB",
});

// * CHECKING the conection
conection.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("Conection success");
  }
});

// * INITIALIZATION
app.get("/", function (req, res) {
  res.send("ROOT Innit");
});

// * C - CREATE an article (record)

app.post("/api/articles", (req, res) => {
  let data = {
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
  };
  let sql = "INSERT INTO articles SET ?";
  conection.query(sql, data, function (err, results) {
    if (err) {
      throw err;
    } else {
      Object.assign(data, { id: results.insertId });
      res.send(results);
    }
  });
});

// * R - READ or show  the articles
app.get("/api/articles", (req, res) => {
  conection.query("SELECT * FROM articles", (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.send(rows);
    }
  });
});

// * R - READ or show just an article (record)
app.get("/api/articles/:id", (req, res) => {
  conection.query(
    "SELECT * FROM articles WHERE id = ?",
    [req.params.id],
    (err, row) => {
      if (err) {
        throw err;
      } else {
        res.send(row);
        // if want to show only one column of the record
        //  res.send(row[0].price);
      }
    }
  );
});

// * U - UPDATED records
app.put("/api/articles/:id", (req, res) => {
  let id = req.params.id;
  let description = req.body.description;
  let price = req.body.price;
  let stock = req.body.stock;
  let sql =
    "UPDATE articles SET description = ?, price = ?, stock = ? WHERE id = ?";
  conection.query(
    sql,
    [description, price, stock, id],
    function (err, results) {
      if (err) {
        throw err;
      } else {
        res.send(results);
      }
    }
  );
});

// * D - DELETE records
app.delete("/api/articles/:id", (req, res) => {
  conection.query(
    "DELETE FROM articles WHERE id = ?",
    [req.params.id],
    function (err, rows) {
      if (err) {
        throw err;
      } else {
        res.send(rows);
      }
    }
  );
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Server up");
});
