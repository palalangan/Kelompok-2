const { application, request, response } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 3000;
let usr = require("./users");
const { json } = require("express/lib/response");

//Morgan untuk mencatat log
app.use(morgan("dev"));

//Penanganan CORS. Tambahkan url: http://127.0.0.1:5500  untuk methods GET, POST, PUT, DELETE
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log("Time: ", Date.now() + " " + req.ip + " " + req.originalUrl);
  next();
});

//1. GET: /users (JADI)
app.get("/users", (req, res) => res.send(usr));
// app.get("/", (req, res) => res.json({nama: "pala'langan, radocen chrisnov"}));

//2. GET: /users/:name (JADI TAPI TINGGAL ERROR MESSAGE YANG BELUM)
app.get("/users/:name", (req, res) => {
  const result = usr.filter((val) => {
    return val.name.toLocaleLowerCase() === req.params.name.toLocaleLowerCase();
  });
  if (result.length === 0) {
    return res.json({
      message: "Data tidak ditemukan",
    });
  } else {
    return res.json(result);
  }
});

//3. POST: /users (JADI)
app.post("/users", (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Masukkan data yang akan di tambahkan",
    });
  }
  const nil = {
    id: usr.length + 1,
    name: req.body.name,
  };
  usr.push(nil);
  return res.send(usr);
});

//4. PUT: /users/:name
app.put("/users/:name", (req, res) => {
  const newName = req.body.name;
  const nama = usr.filter((val) => {
    return val.name.toLocaleLowerCase() === req.params.name.toLocaleLowerCase();
  });

  if (nama.length === 0) {
    return res.json({
      message: "Data tidak ditemukan",
    });
  } else if (!req.body.name) {
    return res.json({
      message: "Request body kosong atau tidak ada data yang dimasukkan",
    });
  } else {
    usr.forEach((val) => {
      if (val.name.toLowerCase() === req.params.name.toLowerCase()) {
        val.name = newName;
      }
    });
  }
  return res.json(usr);
});

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
