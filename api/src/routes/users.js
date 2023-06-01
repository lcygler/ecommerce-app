const { Router } = require('express');
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  sendEnableUser,
  sendDisableUser,
  sendAddAdmin,
  sendRemoveAdmin,
} = require('../controllers/users');
const { addOrUpdateShippingAddress } = require('../controllers/shippingAddress');
const { postRegister, postLogin, google } = require('../handlers/usersHandler');
// const { checkAuth } = require("../middlewares/auth");

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/register', postRegister);
router.post('/login', postLogin);
router.post('/login/google', google);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/shipping/:id', addOrUpdateShippingAddress); // Ruta para agregar o actualizar el ShippingAddress
router.get('/enable', sendEnableUser);
router.get('/disable', sendDisableUser);
router.get('/admin/enable', sendAddAdmin);
router.get('/admin/disable', sendRemoveAdmin);

module.exports = router;
