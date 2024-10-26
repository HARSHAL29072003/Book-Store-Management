const router = require("express").Router();
const User = require("../models/user"); // Renamed the model to avoid name conflict
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth"); 

// Sign up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // Check length of username
        if (!username || username.length < 4) {
            return res.status(400).json({ message: "Username length should be greater than 3" });
        }

        // Check existing username
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check existing email
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Check password length
        if (password.length <= 5) {
            return res.status(400).json({ message: "Password's length should be greater than 5" });
        }

        const hashPass = await bcrypt.hash(password, 10);
        
        // Create new user
        const newUser = new User({
            username: username,
            email: email,
            password: hashPass,
            address: address,
        });

        await newUser.save();
        return res.status(200).json({ message: "Sign Up Successfully" });

    } catch (error) {
        console.error("Error during sign-up:", error); // Log the actual error message
        res.status(500).json({ message: "Internal server error" });
    }
});

// Sign in
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Username or Password" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (isMatch) {
            const authClaims = [
                { name: existingUser.username },
                { role: existingUser.role },
            ];
            const token = jwt.sign({ authClaims }, "bookStore123", { expiresIn: "30d" });
            return res.status(200).json({
                id: existingUser._id,
                role: existingUser.role,
                token: token,
            });
        } else {
            return res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Error during sign-in:", error); // Log the actual error message
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get user information
router.get("/get-user-information", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        console.log(`Received ID: ${id}`); // Log the ID to confirm it's being received

        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching user information:", error); // Log the error for debugging
        res.status(500).json({ message: "Internal server error" });
    }
});


//update address
router.put("/update-address", authenticateToken , async (req,res) => {
    try {
        const { id } = req.headers;  
        const {address} = req.body;
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"Address updated successfully"});
    } catch (error) {
        res.status(500).json({ message: "Internal server error" }); 
    }
});

module.exports = router;
