const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const seasons = [
      { id: 1, name: 'Verano' },
      { id: 2, name: 'Primavera' },
      { id: 3, name: 'Invierno' },
      { id: 4, name: 'Otoño' },
    ];
    res.status(200).json(seasons);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
