const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { encrypt, compare } = require("../utils/HashPassword.js");
const { Users } = require("../db.js");

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    const user = await Users.findOne({ where: username });

    if (!user) {
      return cb(null, false, { message: "Incorrect username or password." });
    }

    const hashedPassword = encrypt(password);

    if (!compare(used.password, hashedPassword)) {
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

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post("/signup", function (req, res, next) {
  const hashedPassword = encrypt(req.body.password);

  const user = Users.create({
    username: req.body.username,
    password: hashedPassword,
  });

  req.login(user, function (err) {
    if (err) {
      return next(err);
    }
    
    res.redirect("/");
  });
});

module.exports = router;
