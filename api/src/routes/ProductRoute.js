const { 
  getAllProducts,
  createProduct,
  updateProduct, 
  deleteProduct
} = require('../controllers/ProductController');
const { Op } = require('sequelize');
const { Product, Season, Category, Review } = require('../db');
const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).send('Server Error');
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
  
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
  
    const updatedProduct = await product.update(req.body);
  
    return res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: {
        id: {
          [Op.eq]: id
        },
        disable: false
      },
      include: [
        {
          model: Season
        },
        {
          model: Category
        },
        {
          model: Review
        }
      ]
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { name , size, gender, description, price, discounts, stock, image} = req.body;
    
    if (!name || !description || !price || !stock || !image || !size || !gender) {
      throw new Error('Missing required fields');
    }
    
    const addProduct = await createProduct(name, size, gender, description, price, discounts, stock, image);
    res.status(201).json(addProduct);
  } catch (error) {
    res.status(501).send({ error: error.message });
  }
});




router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const productData = req.body;

  try {
    const updatedProduct = await updateProduct(id, productData);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.put('/products/:id/disable', async (req, res) => {
  try {
    const { id } = req.params;
   await deleteProduct(id);
    res.status(200).json({ message: "successful embroidery"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;