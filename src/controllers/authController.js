const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  signUp: async (req, res) => {
    try {
      if (!req.body.hasOwnProperty("name")) {
        res.status(400).json({ message: "name is required" });
      } else if (!req.body.hasOwnProperty("email")) {
        res.status(400).json({ message: "email is required" });
      } else if (!req.body.hasOwnProperty("password")) {
        res.status(400).json({ message: "password is required" });
      } else {
        let { name, email, password } = req.body;
        password = await bcrypt.hash(password, 10);
        let user = new User({ name, email, password });
        await user.save();
        user.password = undefined;
        const token = jwt.sign({ payload: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.status(200).json({
          message: "User Created Successfully",
          data: user,
          token,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  signIn: async (req, res) => {
    try {
      if (!req.body.hasOwnProperty("email")) {
        res.status(400).json({ message: "email is required" });
      } else if (!req.body.hasOwnProperty("password")) {
        res.status(400).json({ message: "password is required" });
      } else {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
          let verify = bcrypt.compare(password, user.password);
          if (verify) {
            const token = jwt.sign(
              { payload: user.id },
              process.env.JWT_SECRET,
              {
                expiresIn: "1d",
              }
            );
            user.password = undefined;
            res
              .status(200)
              .json({ message: "Login successful", token, data: user });
          } else {
            res.status(400).json({
              message: "Invalid Email or Password",
            });
          }
        }
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
