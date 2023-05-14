const { Router } = require("express");
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const { postRegister, postLogin } = require("../handlers/usersHandler");

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/register", postRegister);
router.post("/login", postLogin);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
