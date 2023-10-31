const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 8001;
const path = require("path");
io.on("connection", (socket) => {
  io.emit("welcome", "Welcome to SparkChat");
  console.log("connection done");
  socket.on("message", (msg) => {
    console.log(msg, socket.id);
    io.emit("chat", msg);
  });
});
app.use(express.static(path.resolve("./src/public")));
app.use(express.static("//public"));
app.get("/", (req, res) => {
  res.sendFile("public/index.html");
});
server.listen(PORT, (err) => {
  if (err) {
    console.log(`Server Failed: ${err}`);
  } else {
    console.log(`Server is running at PORT ${PORT}`);
  }
});
