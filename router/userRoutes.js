const express = require("express")
const router = express.Router()



const { getUserProfile, login, RegisterUser } = require("../controllers/userController")
const { protect } = require("../middleware/authMiddleware")

router.post("/register", RegisterUser);
router.post("/login", login);
router.get("/profile",protect,getUserProfile)

module.exports = router 