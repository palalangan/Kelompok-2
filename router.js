const router = require("express").Router();
const multer = require("multer");
require("./mongoose");
const User = require("./Users");

// ------------------- MONGOOSE ------------------------------
//Menampilkan semua users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send({ status: "success", message: "list users", data: users });
  } catch (error) {
    res.send({ status: "error", message: error.message });
  }
});
//Menampilkan single users
router.get("/users/:id", async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    if (users) {
      res.send({ status: "success", message: "single users", data: users });
    } else {
      res.send({ status: "warning", message: "user tidak ditemukan" });
    }
  } catch (error) {
    res.send({ status: "error", message: error.message });
  }
});
//Menambah user

//Mengupdate user

//Menghapus user

module.exports = router;
