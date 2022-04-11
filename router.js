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
router.post("/users", async (req, res) => {
  const us = new User(req.body);

  try{
    await us.save();
    res.send(us);
  }catch (error){
    res.status(500).send(error);
  }
})

//Mengupdate user
router.put("/users/:id", async (req, res) => {
  const us = new User(req.body);

  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    await User.save();
    res.send(us)
  } catch (error){
    res.status(500).send(error);
  }
})

//Menghapus user
router.delete("/users/:id", async (req, res) => {
  try {
    const us = await User.findByIdAndDelete(req.params.id);

    if(!us) res.status(404).send("Data tidak ditemukan");
    res.status(200).send();
  } catch(error){
    res.status(500).send(error);
  }
})

module.exports = router;
