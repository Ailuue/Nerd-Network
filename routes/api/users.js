const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");

//Load User Model
const User = require("../../models/User");

//@route GET api/users/test
//@desc Tests users route
//@access Public

router.get("/test", (req, res) => res.json({ msg: "Users Works!" }));

//@route GET api/users/register
//@desc Register user
//@access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" // default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
    }
  });
});
module.exports = router;
