const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send('No se proporcionó token');
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).send('Token no válido');
      }
      if (user.role !== 'admin') {
        return res.status(401).send('No tiene permisos suficientes para realizar esta acción');
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).send('Token no válido');
    }
  };
  

  module.exports = { verifyToken };