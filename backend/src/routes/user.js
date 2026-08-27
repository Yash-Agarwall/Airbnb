const express = require("express");
const path = require("path");
const router = express.Router();
const Login = require("../controllers/auth/login.js");
const SignUp = require("../controllers/auth/signup.js");
const Logout = require("../\/controllers/auth/logout.js");
const User = require("../models/user.js");
const editProfile = require("../\/controllers/user/editProfile.js");
const { isLoggedIn } = require("../middlewares/middleware.js");

router.post("/signup", SignUp);

router.post("/login", Login);

router.get("/logout", Logout);

router.patch("/profile", isLoggedIn, editProfile);

router.get("/current_user", isLoggedIn, async (req, res) => {
  const user = await User.findById(req.user.userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({
    id: user._id,
    username: user.username,
    email: user.email,
    profile: user.profile,
    role: user.role,
  });
});

module.exports = router;
