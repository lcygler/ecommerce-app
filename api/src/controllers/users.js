const express = require("express");
const {
  User,
  Review,
  Cart,
  CartDetail,
  PurchaseDetail,
  Product,
  ShippingAddress,
} = require("../db.js");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    let user = req.body;

    const userUpdated = await User.update(user, {
      where: { id },
    });

    res.json(userUpdated);
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne(
      { where: id },
      {
        include: [
          { model: Review },
          { model: Cart },
          { model: CartDetail },
          { model: PurchaseDetail },
          { model: Product },
          { model: ShippingAddress },
        ],
      }
    );
    res.json(user);
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDeleted = await User.destroy({
      where: { id },
    });
    res.json(userDeleted);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  updateUser,
  getUserById,
  deleteUser,
};
