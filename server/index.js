const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("../server/routes/auth");
const messageRoutes = require("../server/routes/message");

const userRoutes = require("../server/routes/userRoutes");
const socket = require("socket.io");



const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/testdb').then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

  app.use("/api/auth", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on Port ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});