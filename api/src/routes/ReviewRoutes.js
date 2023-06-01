const { Router } = require('express');
const { Review, User, Product } = require('../db');
const review = Router();

// Obtener todas las reseñas
review.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [User, Product],
    });
    res.json(reviews);
  } catch (error) {
    console.log(error);
    res.status(200).status(500).json({ message: 'Hubo un error al obtener las reseñas' });
  }
});

// Crear una nueva reseña
review.post('/', async (req, res) => {
  const { comment, punctuation, userId, productId } = req.body;

  try {
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);

    if (!user || !product) {
      return res.status(404).json({ message: 'Usuario o producto no encontrado' });
    }

    const newReview = await Review.create({
      comment,
      punctuation,
      UserId: userId,
      ProductId: productId,
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Hubo un error al crear la reseña' });
  }
});

// Editar una reseña existente
review.patch('/:reviewId', async (req, res) => {
  const { comment, punctuation, disable } = req.body;
  const { reviewId } = req.params;

  try {
    const existingReview = await Review.findByPk(reviewId, {
      include: [User, Product],
    });

    if (!existingReview) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    // Actualizar los campos de la reseña
    existingReview.comment = comment || existingReview.comment;
    existingReview.punctuation = punctuation || existingReview.punctuation;
    existingReview.disable = disable || existingReview.disable;

    await existingReview.save();

    res.status(200).json(existingReview);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Hubo un error al editar la reseña' });
  }
});

// Eliminar una reseña
review.delete('/:reviewId', async (req, res) => {
  const { reviewId } = req.params;

  try {
    const existingReview = await Review.findByPk(reviewId);

    if (!existingReview) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    await existingReview.destroy();

    res.status(200).json({ message: 'Reseña eliminada exitosamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Hubo un error al eliminar la reseña' });
  }
});

module.exports = review;
