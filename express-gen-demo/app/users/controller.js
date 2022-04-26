const User = require("./model");

const index = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send({ status: "success", message: "list users", data: users });
  } catch (error) {
    res.send({ status: "error", message: error.message });
  }
};

const getUserById = async (req, res, next) => {
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
};

const postUser = async (req, res, next) => {
  const us = new User(req.body);

  try {
    await us.save();
    res.send(us);
  } catch (error) {
    res.status(500).send(error);
  }
};

const putUser = async (req, res, next) => {
  const us = new User(req.body);

  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    await User.save();
    res.send(us);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const us = await User.findByIdAndDelete(req.params.id);

    if (!us) res.status(404).send("Data tidak ditemukan");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  index,
  getUserById,
  postUser,
  putUser,
  deleteUser,
};
