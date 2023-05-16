const { v4: uuidv4 } = require('uuid');

const { Trolley, CartDetail, Product } = require("../db.js");

const generateUniqueId = function () {
  const uiid = uuidv4();
  return uiid;
};

const uniqueCartId = function (request) {
  if (request.session.uniqueCartId) {
    return request.session.uniqueCartId;
  } else {
    request.session.uniqueCartId = generateUniqueId();
    return request.session.uniqueCartId;
  }
};

const getCart = async function (request) {
  const uniqueId = uniqueCartId(request);
  const cart = await Trolley.findOrCreate({
    where: { uniqueCartId: uniqueId },
  });
  return cart;
};

const addToCart = async function (request) {
  const productId = request.body.productId;
  const cart = await getCart(request);

  const cartDetail = await CartDetail.findOne({
    where: { productId: productId, cartId: cart[0].id },
  });

  if (cartDetail) {
    const amnt = cartDetail.amount + 1;
    CartDetail.update(
      { amount: amnt },
      {
        where: { productId: productId, cartId: cart[0].id },
      }
    );
  } else {
    CartDetail.create({
      amount: 1,
      cartId: cart[0].id,
      productId: productId,
    });
  }
};

const removeFromCart = async function (request) {
  const cartDetailId = request.body.cartDetailId;
  return await CartDetail.destroy({
    where: { id: cartDetailId },
  });
};

const getCartItems = async function (request) {
  const cart = getCart(request);

  const cartDetails = await CartDetail.findAll({
    where: { cartId: cart[0].id },
    include: [{ model: Product }],
  });

  return cartDetails;
};

module.exports = {
  addToCart,
  removeFromCart,
  getCartItems,
  getCart,
  uniqueCartId,
};
