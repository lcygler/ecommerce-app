const { ShippingAddress } = require('../db.js');

const addOrUpdateShippingAddress = async (req, res) => {
  const { country, address, postalcode } = req.body;
  const userId = req.params.id; // ID del usuario al que se asociará el ShippingAddress

  try {
    let shippingAddress = await ShippingAddress.findOne({ where: { UserId: userId } });

    if (!shippingAddress) {
      // Si no existe ShippingAddress para el usuario, crear uno nuevo
      shippingAddress = await ShippingAddress.create({
        country,
        address,
        postalcode,
        UserId: userId,
      });
    } else {
      // Si ya existe ShippingAddress, actualizar la información
      await shippingAddress.update({
        country,
        address,
        postalcode,
      });
    }

    res.status(200).json({ success: true, shippingAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error al agregar o actualizar el ShippingAddress' });
  }
};

module.exports = { addOrUpdateShippingAddress };
