const { verifyToken } = require('../utils/generateToken');
const { User } = require('../db');

const checkRoleAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const tokenData = await verifyToken(token);
    // console.log(tokenData);
    const userData = await User.findByPk(tokenData.id);
    const role = userData.isAdmin;
    if (role) {
      next();
    } else {
      res.status(401);
      res.send({ error: 'No tienes los permisos necesarios' });
    }
  } catch (error) {
    res.status(402);
    res.send({ error: error.message });
  }
};

module.exports = { checkRoleAuth };
