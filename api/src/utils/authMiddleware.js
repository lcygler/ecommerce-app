const { User } = require('../db.js');

const verifyTokenn = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('No se proporcionó token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    console.log(user);
    if (!user) {
      return res.status(401).send('Token no válido');
    }
    if (user.isAdmin === false) {
      return res.status(401).send('No tiene permisos suficientes para realizar esta acción');
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(402).send('Token no válido');
  }
};

module.exports = { verifyTokenn };
