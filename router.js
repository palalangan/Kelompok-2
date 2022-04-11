const router = require("express").Router();
const client = require("./connection");
const { ObjectId } = require("mongodb");
const Data = require("./models/users");
const express = require("express");
const multer = require("multer");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(bodyParser.json());

router.get("/users", async (req, res) => {
  const db = client.db("db_latihan");
  const result = await db.collection("users").find().toArray();
  res.send({ status: "success", message: "list users", data: result });
});

router.get("/users/:id", async (req, res) => {
  try {
    const db = client.db("db_latihan");
    const users = await db
      .collection("users")
      .find({ _id: ObjectId(req.params.id) })
      .toArray();

    if (users.length > 0) {
      res.send({ status: "success", message: "single user", data: users });
    } else {
      res.send({
        status: "warning",
        message: "data tidak ditemukan",
        data: users,
      });
    }
  } catch (error) {
    res.send({ status: "error", message: error.message });
  }
});

// Group Exercise #05

// Tambah User
router.post("/users", urlencodedParser, async (req, res) => {
  const db = client.db("db_latihan");
  const result = await db.collection("users").insertOne({
    name: req.body.name,
    age: req.body.age,
    status: req.body.status,
  });
  res.send({
    status: "success",
    message: "Data berhasil di tambahkan",
    data: { name: req.body.name, age: req.body.age, status: req.body.status },
  });
});

// // Tambah User ini pakai multer
// router.post("/users", multer().none(), async (req, res) => {
//   const db = client.db("db_latihan");
//   const result = await db.collection("users").insertOne({
//     name: req.body.name,
//     age: req.body.age,
//     status: req.body.status,
//   });
//   res.send({
//     status: "success",
//     message: "Data berhasil di tambahkan",
//     data: { name: req.body.name, age: req.body.age, status: req.body.status },
//   });
// });

// Update User
router.put("/users/:id", urlencodedParser, async (req, res) => {
  const db = client.db("db_latihan");
  const result = await db.collection("users").updateOne(
    {
      _id: ObjectId(req.params.id),
    },
    {
      $set: {
        name: req.body.name,
        age: req.body.age,
        status: req.body.status,
      },
    }
  );
  res.send({
    status: "success",
    message: "Data berhasil di ubah",
    data: {
      name: req.body.name,
      age: req.body.age,
      status: req.body.status,
    },
  });
});

// Delete User
router.delete("/users/:id", urlencodedParser, async (req, res) => {
  const db = client.db("db_latihan");
  const result = await db.collection("users").deleteOne({
    _id: ObjectId(req.params.id),
  });
  res.send({
    status: "success",
    message: "Data berhasil di hapus",
    data: {
      name: req.body.name,
      age: req.body.age,
      status: req.body.status,
    },
  });
});

module.exports = router;
