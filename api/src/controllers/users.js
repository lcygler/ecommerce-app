const express = require("express");
const {
  Users,
  Review,
  Trolley,
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
    const users = await Users.findAll();
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
// const createUser = async (req, res, next) => {
//   try {
//     // TODO Hashear password antes de crear usuario
//     const user = req.body;
//     const newUser = await Users.create(user);
//     res.status(201).json(newUser);
//   } catch (err) {
//     next(err);
//   }
// };

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    let user = req.body;

    const userUpdated = await Users.update(user, {
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

    const user = await Users.findOne(
      { where: id },
      {
        include: [
          { model: Review },
          { model: Trolley },
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
    const userDeleted = await Users.destroy({
      where: { id },
    });
    res.json(userDeleted);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerCtrl,
  getUsers,
  createUser,
  updateUser,
  getUserById,
  deleteUser,
};
