const { Router } = require('express');
const { Product, Purchase, PurchaseDetail, User } = require('../db.js');
const { sendPurchaseSuccess, sendPurchaseFailure } = require('../utils/mail.config.js');

const router = Router();

//* GET ALL PURCHASES
router.get('/', async (req, res) => {
  try {
    const allPurchases = await Purchase.findAll({
      include: [
        {
          model: PurchaseDetail,
          include: {
            model: Product,
          },
        },
        {
          model: User,
          attributes: ['name', 'lastname', 'email', 'phoneNumber'],
        },
      ],
    });

    res.status(200).json(allPurchases);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving purchases' });
  }
});

//* GET USER PURCHASES
router.get('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const purchases = await Purchase.findAll({
      where: { UserId: userId },
      include: {
        model: PurchaseDetail,
        include: {
          model: Product,
        },
      },
    });

    const formattedPurchases = purchases.map((purchase) => ({
      id: purchase.id,
      date: purchase.createdAt.toISOString().split('T')[0], // YYYY-MM-DD
      status: purchase.status,
      total: purchase.total,
      products: purchase.PurchaseDetails.map((detail) => ({
        id: detail.Product.id,
        name: detail.Product.name,
        price: detail.Product.price,
        description: detail.Product.description,
        gender: detail.Product.gender,
        size: detail.Product.size,
        image: detail.Product.image,
        discounts: detail.Product.discounts,
        stock: detail.Product.stock,
        quantity: detail.quantity,
      })),
    }));

    res.status(200).json(formattedPurchases);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error retrieving purchases' });
  }
});

//* CREATE PURCHASE ORDER
router.post('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const products = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    let total = 0;

    const createdPurchase = await Purchase.create({ UserId: userId });

    for (const product of products) {
      const { id, price, discounts, quantity } = product;

      const discountedPrice = price * (1 - discounts);
      const subtotal = discountedPrice * quantity;

      total += subtotal;

      const createdPurchaseDetail = await PurchaseDetail.create({
        PurchaseId: createdPurchase.id,
        price: discountedPrice,
        quantity,
        subtotal,
      });

      const prod = await Product.findByPk(id);
      await prod.addPurchaseDetail(createdPurchaseDetail);
    }

    createdPurchase.total = total;
    await createdPurchase.save();

    const purchase = await Purchase.findOne({
      where: { id: createdPurchase.id },
      include: {
        model: PurchaseDetail,
      },
    });

    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error retrieving purchases' });
  }
});

//* UPDATE PURCHASE ORDER
router.patch('/:purchaseId', async (req, res) => {
  try {
    const { purchaseId } = req.params;
    const { status, total } = req.body;

    const purchase = await Purchase.findByPk(purchaseId);

    if (!purchase) {
      throw new Error('Purchase not found');
    }

    await purchase.update({
      status: status || purchase.status,
      total: total || purchase.total,
    });

    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error updating purchase' });
  }
});

//* DELETE PURCHASE ORDER
router.delete('/:purchaseId', async (req, res) => {
  try {
    const { purchaseId } = req.params;

    const purchase = await Purchase.findOne({ where: { id: purchaseId } });

    if (!purchase) {
      throw new Error('Purchase not found');
    }

    await PurchaseDetail.destroy({ where: { PurchaseId: purchase.id } });

    await Purchase.destroy({ where: { id: purchaseId } });

    res.status(200).json({ message: 'Purchase deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error deleting purchase' });
  }
});

//* PURCHASE SUCCESS
router.post('/success', async (req, res) => {
  try {
    const { email } = req.body;
    sendPurchaseSuccess(email);
    res.status(200).json({ message: 'Purchase success email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending success email' });
  }
});

//* PURCHASE FAILURE
router.post('/failure', async (req, res) => {
  try {
    const { email } = req.body;
    sendPurchaseFailure(email);
    res.status(200).json({ message: 'Purchase failure email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending failure email' });
  }
});

module.exports = router;
