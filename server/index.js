const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

// Generating server
const server = http.createServer(app);

// Telling socket.io to accept socket communication with this URL
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// socket.io pre-built events
io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected.`);

  socket.on("joinChat", (data) => {
    socket.join(data);
    console.log(`User: ${socket.id}, joined the chat.`);
  });

  // Handle sending the data
  socket.on("sendMessage", (data) => {
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected.`);
  });
});

server.listen(3010, () => {
  console.log("Server OK!");
});
