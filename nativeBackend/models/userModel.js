const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: props => `${props.value} is not a valid email address!`,
            },
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^\d{10}$/.test(v); // Example for a 10-digit phone number
                },
                message: props => `${props.value} is not a valid phone number!`,
            },
        },
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("User", userSchema);
