const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URL)
  .then((d) => {
    console.log("Db Connected");
  })
  .catch((e) => {
    console.log(e);
    console.log("Db Connection Failed");
  });
