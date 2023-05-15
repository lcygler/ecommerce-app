const { Router } =  require('express');
const { Category , Product , Season} = require('../db');


const router = Router();

router.get('/', async (req , res) => {
    const dataCategory = await Category.findAll({
        include: [
            {
                model: Product,
                through: 'ProductCategory'
            },
        ]
    });
    try {
        res.status(200).json(dataCategory);
    } catch (error) {
        res.status(500).send({error:error.mesaage});
    }
});


module.exports = router;