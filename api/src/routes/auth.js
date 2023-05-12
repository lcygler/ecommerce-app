const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { encrypt, compare } = require("../utils/HashPassword.js");
const { User } = require("../db.js");

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    const user = await User.findOne({ where: {username} });

    if (!user) {
      return cb(null, false, { message: "Incorrect username or password." });
    }

    const hashedPassword = await encrypt(password);

    if (!compare(user.password, hashedPassword)) {
      return cb(null, false, { message: "Incorrect username or password." });
    }
    return cb(null, user);
  })
);

/* Configure session management.
 *
 * When a login session is established, information about the user will be
 * stored in the session.  This information is supplied by the `serializeUser`
 * function, which is yielding the user ID and username.
 *
 * As the user interacts with the app, subsequent requests will be authenticated
 * by verifying the session.  The same user information that was serialized at
 * session establishment will be restored when the session is authenticated by
 * the `deserializeUser` function.
 */

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

const router = express.Router();

router.post("/login", passport.authenticate("local", {
    //successRedirect: "/",
    //failureRedirect: "/auth/login",
  }),
  function ( req, res, next) {
    res.json({status: "ok", message: "Login succesfully", user: req.user})
  }
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({status: "ok", message: "Logout succesfully", user: req.user})
  });
});

router.post("/signup", async function (req, res, next) {
  const hashedPassword = await encrypt(req.body.password);

  const user = User.create({
    name: req.body.name || "",
    lastname:req.body.lastName || "",
    username: req.body.username,
    email:req.body.email || "",
    password: hashedPassword,
    birthdate: Date.now(),
    phoneNumber: req.body.phoneNumber || "",
    state: true,
    isAdmin: false
  });

  req.login(user, function (err) {
    if (err) {
      return next(err);
    }
    
    res.json({status: "ok", message: "Signup succesfully"})
  });
});

module.exports = router;
