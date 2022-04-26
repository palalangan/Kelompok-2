const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, require: [true, "Nama harus diisi"] },
  age: { type: Number, require: [true, "Age harus diisi"] },
  status: {
    type: String,
    enum: ["active", "non active"],
    default: "non active",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
