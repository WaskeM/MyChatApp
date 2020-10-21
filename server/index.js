const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const {
  addUser,
  removeUser,
  getUser,
  getUsersInChannel
} = require("./users.js");

const PORT = 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", socket => {
  //console.log("We have a new connection !");

  socket.on("join", ({ name, channel }, callback) => {
    //console.log(name, channel);
    const { error, user } = addUser({ id: socket.id, name, channel });

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, Welcome to the ${user.channel} channel !`
    });

    socket.broadcast
      .to(user.channel)
      .emit("message", { user: "admin", text: `${user.name}, has joined` });

    socket.join(user.channel);

    io.to(user.channel).emit('channelData', { channel: user.channel, users: getUsersInChannel(user.channel)})

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.channel).emit("message", { user: user.name, text: message });
    io.to(user.channel).emit("channelData", { channel: user.channel, users: getUsersInChannel(user.channel)});


    callback();
  });

  socket.on("disconnect", () => {
    //console.log("User has left !");
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.channel).emit('message', { user: 'admin', text: `${user.name} has left ${user.channel} channel.`})
    }
  })
});

app.use(router);

server.listen(PORT, () => console.log(`Server has start on ${PORT}`));
