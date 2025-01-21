const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const JWT_SECRET = process.env.JWT_SECRET

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        //validate input sdccsdcsds
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password Required" })
        }

        // Check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found!" })
        }

        //verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        //now generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        //Respond with token
        res.status(200).json({
            message: "Login Successfully!",
            token,
            userId: user._id,
            user
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = { loginUser }