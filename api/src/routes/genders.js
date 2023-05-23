const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const genders = [
      { id: 1, name: 'Hombre' },
      { id: 2, name: 'Mujer' },
      { id: 3, name: 'Otros' },
    ];
    res.status(200).json(genders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
