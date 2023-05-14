const { getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/ProductController');
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

router.post('/', async(req, res) => {
  const {name, size, gender, description, price, discounts, stock, image, Category, Season} = req.body;
try {
  if (!name || !description || !price || !stock || !image || !Category || !Season) {
    throw new Error('Missing required fields');
  }
  const addProduct = await createProduct(name, size, gender, description, price, discounts, stock, image, Category.name, Season.name);
res.status(201).json( addProduct);
} catch (error) {
  res.status(501).send({error: error.message});
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