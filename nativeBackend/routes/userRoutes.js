const express = require("express")
const { createUser, deleteUser } = require("../controllers/userController")
const router = express.Router()

router.post('/signup', createUser)
router.delete('/delete/:id', deleteUser)

module.exports = router