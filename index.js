const { response } = require("express");
const express = require("express");
const app = express();
const port = 3000;
const router = require("./router");

//Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.listen(port, () =>
  console.log(`Server running at http://localhost: ${port}`)
);
