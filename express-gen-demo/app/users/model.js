const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, require: [true, "Nama harus diisi"] },
  age: { type: Number, require: [true, "Age harus diisi"] },
  team: { type: String, require: [true, "Team harus diisi"] },
  game: {
    type: String,
    enum: ["Dota2", "VALORANT", "Apex Legends", "PUBG", "CSGO"],
    default: "Dota2",
  },
  status: {
    type: String,
    enum: ["Captain", "Member", "Coach"],
    default: "Captain",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;