const { 
  getAllProducts,
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
    
    res.status(500).send('Server Error');
  }
});

router.patch('/:id',  async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
  
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
  
    const updatedProduct = await product.update(req.body);
  
    return res.json(updatedProduct);
  } catch (error) {
    
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
    return res.status(500).json({ message: 'Internal server error' });
  }
});







router.post('/', async (req, res) => {
  const { name, size, gender, description, price, discounts, stock, image, Seasons, Categories } = req.body;

  try {
    // Se crean las instancias de los modelos de Season y Category
    const seasons = await Season.findAll({ where: { name: Seasons.name } });
    const categories = await Category.findAll({ where: { name: Categories.name } });
  
    // Se crea la instancia del modelo de Producto y se asignan los valores correspondientes
    const newProduct = await Product.create({
      name: name,
      size: size,
      gender: gender,
      description: description,
      price: price,
      discounts: discounts,
      stock: stock,
      image: image
    });
  
    // Se relacionan los modelos de Season y Category con el modelo de Producto
    await newProduct.setSeasons(seasons);
    await newProduct.setCategories(categories);
  
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});


module.exports = router;