// const MongoClient = require("mongodb").MongoClient;
const { MongoClient } = require("mongodb");
const uri = "mongodb://user_latihan:123456@localhost:27017";
// const uri = "mongodb://localhost:27017";

// MongoClient.connect(uri, (err, client) => {
//   if (err) throw err;

//   const db = client.db("db_latihan");

//   db.collection("users")
//     .find()
//     .toArray((err, result) => {
//       if (err) throw err;

//       console.log(result);
//     });
// });

// MongoClient.connect(uri)
//   .then((client) => {
//     const db = client.db("db_latihan");

//     db.collection("users")
//       .find()
//       .toArray((err, result) => {
//         if (err) throw err;

//         console.log(result);
//       });
//   })
//   .catch((error) => console.log(error));

(async () => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("db_latihan");

    db.collection("users")
      .find()
      .toArray((err, result) => {
        if (err) throw err;

        console.log(result);
      });
  } catch (error) {
    console.log(error);
  }
})();
