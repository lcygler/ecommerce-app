const { Router } = require('express');
const { Product } = require('../db');

const stock = Router();

stock.get('/', async (req, res) => {
    try {
        const dataStock = await Product.findAll();
        const stockValues = dataStock.map(product => product.stock);
        res.status(200).json(stockValues);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el stock' });
    }
});


stock.patch('/updateStock/:productId', async (req, res) => {
    const { productId } = req.params;
    const { increase, decrease } = req.body;
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
    
        let newStock = product.stock;
        if (increase) {
            newStock += increase;
        }
        if (decrease) {
            newStock = Math.max(newStock - decrease, 0); // No permitir valores negativos
        }
        product.stock = newStock;
        await product.save();
    
        let message;
        if (newStock <= 5 && newStock > 0) {
            message = 'Últimas unidades disponibles';
        } else if (newStock === 0) {
            message = 'No hay stock disponible';
        } else {
            message = 'Stock actualizado correctamente';
        }
    
        res.status(200).json({ message, stock: newStock });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el stock' });
    }
});


stock.patch('/updateStock', async (req, res) => {
    const  products  = req.body;
    try {
        for (const product of products) {
          const { id, quantity } = product;
          const existingProduct = await Product.findByPk(id);
    
          if (!existingProduct) {
            return res.status(404).json({ error: `Producto no encontrado: ${id}` });
          } 
    
          if ((existingProduct.stock - quantity) < 0) {
            return res.status(400).json({ error: `No se puede establecer un stock negativo para el producto: ${existingProduct.name}` });
          }

          existingProduct.stock -= quantity;
          await existingProduct.save();
        }
    
        res.status(200).json({ message: 'Stock actualizado correctamente' });
      } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el stock' });
      }
  });
  
module.exports = stock;
