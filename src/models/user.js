const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is required"],
  },
  email: {
    type: String,
    require: [true, "email is required"],
    unique: [true, "email is exist"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [6, "pssoword should be more than 6 character"],
  },
  socketId: String,
});

const User = mongoose.model("user", userSchema);
module.exports = User;
