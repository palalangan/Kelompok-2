var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect(
  "mongodb://user_latihan:123456@localhost:27017/db_latihan?authSource=admin",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

var db = mongoose.connection;

db.on("error", () => console.log("Error in Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));

app.post("/signup", (req, res) => {
  var name = req.body.name;
  var password = req.body.password;
  var age = req.body.age;
  var team = req.body.team;
  var game = req.body.game;
  var status = req.body.status;

  var data = {
    name: name,
    password: password,
    age: age,
    team: team,
    game: game,
    status: status,
  };

  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  return res.redirect("signup_success.html");
});

app
  .get("/", (req, res) => {
    res.set({
      "Allow-access-Allow-Origin": "*",
    });
    return res.redirect("index.html");
  })
  .listen(3000);

console.log("Listening on PORT 3000");
