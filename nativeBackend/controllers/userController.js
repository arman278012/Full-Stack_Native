const userModel = require("../models/userModel")

//To create the user
const createUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body

        //check if the user is already registered
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered!" })
        }

        //create a new user
        const user = new userModel({
            name, email, password, phone
        })

        await user.save()
        res.status(201).json({ message: "User Added Successfully", user })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to add user", error })
    }
}

//To delete the user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find the user by ID and delete the user
        const user = await userModel.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete user", error });
    }
};


module.exports = { createUser, deleteUser }