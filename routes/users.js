const express = require("express");
const User = require("../models/user");

const router = express.Router();

// Get all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new user
router.post("/users", async (req, res) => {

    console.log(req.body)
    const user = new User({
        name: req.body.name,
        phone: req.body.phone,
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
