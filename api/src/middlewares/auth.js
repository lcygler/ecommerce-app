const { verifyToken } = require('../utils/generateToken');
// const { verifyToken } = require('../utils/verify');

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const tokenData = await verifyToken(token);
    console.log(tokenData);
    if (tokenData.id) {
      next();
    } else {
      res.status(401);
      res.send({ error: 'No tienes los permisos necesarios' });
    }
  } catch (error) {
    res.status(400);
    res.send({ error: 'No tienes los permisos necesarios' });
  }
};

module.exports = { checkAuth };
