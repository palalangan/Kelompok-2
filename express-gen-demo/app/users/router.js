var express = require("express");
var router = express.Router();
const {
  index,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} = require("./controller");

/* GET home page. */
router.get("/users", index);
router.get("/users/:id", getUserById);
router.post("/users", postUser);
router.put("/users/:id", putUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
