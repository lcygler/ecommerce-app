const { verifyToken } = require("../utils/generateToken");
const { User } = require("../db.js");

const checkRoleAuth = (roles) => async (req, res, next) => {
  try {
    const token = req.headers.authorization.split("").pop();
    const tokenData = await verifyToken(token);
    const userData = await User.findById(tokenData.id);

    if ([].concat(roles).includes(userData.role)) {
      next();
    } else {
      res.status(400);
      res.send({ error: "No tienes los permisos necesarios" });
    }
  } catch (error) {
    res.status(400);
    res.send({ error: "No tienes los permisos necesarios" });
  }
};

module.exports = { checkRoleAuth };
