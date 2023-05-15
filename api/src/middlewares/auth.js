const { verifyToken } = require("../utils/generateToken");

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split("").pop();
    const tokenData = await verifyToken(token);
    if (tokenData.id) {
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

module.exports = { checkAuth };
