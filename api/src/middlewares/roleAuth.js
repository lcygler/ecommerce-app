const { verifyToken } = require('../utils/generateToken');
const { User } = require('../db');

const checkRoleAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ').pop();
    const tokenData = await verifyToken(token);
    const userData = await User.findByPk(tokenData.id);
    const role = userData.isAdmin;
    if (role == true) {
      next();
    } else {
      res.status(401);
      res.send({ error: 'No tienes los permisos necesarios' });
    }
  } catch (error) {
    res.status(402);
    res.send({ error: 'No tienes los permisos necesarios' });
  }
};

module.exports = { checkRoleAuth };
