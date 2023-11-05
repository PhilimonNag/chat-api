const User = require("../models/user");

module.exports = (server) => {
  const io = require("socket.io")(server);
  io.on("connection", (socket) => {
    socket.on("online", async (userId) => {
      let user = await User.findOneAndUpdate(
        { _id: userId },
        { socketId: socket.id }
      );
      console.log(socket.id);
      user.password = undefined;
      io.emit("user", { user });
    });
    console.log("connection done");
    // socket.on("message", (msg) => {
    //   // console.log(msg, socket.id);
    //   io.emit("chat", msg);
    // });

    socket.on("joinRoom", (room) => {
      console.log("joinRoom : ", room);
      socket.join(room);
      io.to(room).emit("welcome", "Welcome To SparkChat");
      io.to(room).emit("users", [socket.id]);
    });
    socket.on("sendToRoom", (data) => {
      const { room, message } = data;
      console.log("sendToRoom :", data);
      io.to(room).emit("message", message);
    });

    socket.on("leaveRoom", (room) => {
      console.log("leaveRoom :", room);
      socket.leave(room);
    });
  });
};
