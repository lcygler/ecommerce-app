const axios = require("axios");

const createPayment = async (req) => {
  const url = "https://api.mercadopago.com/checkout/preferences";

  const preference = {
    items: [
      {
        title: "Dummy Title", // Aca iria req.body.name
        description: "Dummy description", // Aca iria req.body.description
        picture_url: "http://www.myapp.com/myimage.jpg", // Aca iria req.body.image
        category_id: "category123", // Aca iria req.body.category
        quantity: 1, // Aca iria Number(req.body.amount)
        currency_id: "ARS",
        unit_price: 10, // Aca iria Number(req.body.price)
      },
    ], // items es un array de objetos donde cada objeto representa un producto
    back_urls: {}, // URLs para responder en cualquiera de los tres casos
    shipments: {} // Para manejar configuracion de envio
  };

  const payment = await axios.post(url, preference, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
    },
  });

  return payment.data;
};

module.exports = { createPayment };
