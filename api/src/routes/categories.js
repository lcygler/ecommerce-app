const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const categories = [
      { id: 1, name: 'Remeras' },
      { id: 2, name: 'Pantalones' },
      { id: 3, name: 'Buzos' },
      { id: 4, name: 'Camisas' },
      { id: 5, name: 'Vestidos' },
      { id: 6, name: 'Camperas' },
      { id: 7, name: 'Faldas' },
      { id: 8, name: 'Sweaters' },
      { id: 9, name: 'Jeans' },
      { id: 10, name: 'Shorts' },
      { id: 11, name: 'Trajes' },
      { id: 12, name: 'Deportes' },
      { id: 13, name: 'Calcetines' },
      { id: 14, name: 'Ropa interior' },
      { id: 15, name: 'Trajes de baño' },
    ];
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
