const mongoose = require("mongoose");
const uri =
  "mongodb://user_latihan:123456@localhost:27017/db_latihan?authSource=admin";

mongoose.connect(uri, () => console.log("Koneksi berhasil"));
