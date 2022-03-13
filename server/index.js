const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

app.use(cors());

//Generating server
const server = http.createServer(app);

server.listen(3010, () => {
  console.log("Server OK!");
});
