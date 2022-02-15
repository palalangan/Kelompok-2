const http = require("http");
const moment = require("moment");
const members = require("./members.js");
const users = require("./users.js");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  const url = req.url;
  if (url === "/about") {
    res.setHeader("Content-Type", "text/json");
    res.write(
      JSON.stringify({
        Status: "success",
        Message: "response success",
        Description: "Group Exercise #03",
        Date: moment().format('2022-02-15T07:51:09+08:00'),
        Data: members.array()
      })
    );
  } else if (url === "/users") {
    res.setHeader("Content-Type", "text/json");
    res.write(
      JSON.stringify({
        Data: users.array2()
      })
    );
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<html><body><h2>This is the home page.</h2></body></html>");
  }
  res.end();
});

const hostname = "127.0.0.1"; //localhost
const port = 3000;
server.listen(port, hostname, () => {
  console.log(`Server running at http:/${hostname}:${port}`);
});
