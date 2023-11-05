const express = require("express");
const app = express();
require("dotenv").config();
const server = require("http").createServer(app);
const PORT = process.env.PORT || 8001;
require("./service/socketService")(server);
require("./database/db");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", require("./routes/route"));

server.listen(PORT, (err) => {
  if (err) {
    console.log(`Server Failed: ${err}`);
  } else {
    console.log(`Server is running at PORT ${PORT}`);
  }
});
