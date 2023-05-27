const API_URL = process.env.API_URL || 'http://localhost:3000';
const axios = require('axios');

const createPayment = async (products) => {
  const url = 'https://api.mercadopago.com/checkout/preferences';

  const formattedProducts = products?.map((product) => ({
    title: product.name,
    description: product.description,
    picture_url: product.image,
    // category_id: product.Categories[0].id,
    quantity: product.quantity,
    currency_id: 'ARS',
    unit_price: product.price * (1 - product.discounts),
  }));

  const preference = {
    items: formattedProducts,
    back_urls: {
      failure: `${API_URL}/cart`,
      pending: `${API_URL}/purchases`,
      success: `${API_URL}/purchases`,
    },
    shipments: {},
  };

  // const preference = {
  //   items: [
  //     {
  //       title: 'Dummy Title', // Aca iria req.body.name
  //       description: 'Dummy description', // Aca iria req.body.description
  //       picture_url: 'http://www.myapp.com/myimage.jpg', // Aca iria req.body.image
  //       category_id: 'category123', // Aca iria req.body.category
  //       quantity: 1, // Aca iria Number(req.body.amount)
  //       currency_id: 'ARS',
  //       unit_price: 10, // Aca iria Number(req.body.price)
  //     },
  //   ], // items es un array de objetos donde cada objeto representa un producto
  //   back_urls: {}, // URLs para responder en cualquiera de los tres casos
  //   shipments: {}, // Para manejar configuracion de envio
  // };

  const payment = await axios.post(url, preference, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
    },
  });

  return payment.data;
};

module.exports = { createPayment };
