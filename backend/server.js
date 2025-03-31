const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

dotenv.config();
const app = express();
app.use(cors()); // Fix CORS issue
app.use(express.json()); // Parse JSON data

// ✅ MongoDB Connection (Replace with your DB name)
mongoose.connect("mongodb://localhost:27017/careerguidance", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB Connected");
}).catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
});

// ✅ User Schema & Model
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});
const User = mongoose.model("User", userSchema);

// ✅ Register Route
app.post("/api/auth/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User Registered Successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error Registering User", error: err });
    }
});

// ✅ Login Route
app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, "secret_key", { expiresIn: "1h" });

        res.json({ token, userId: user._id });
    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err });
    }
});

// ✅ User Authentication Route (Protected)
app.get("/api/auth/user", (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        jwt.verify(token, "secret_key", (err, decoded) => {
            if (err) return res.status(403).json({ message: "Invalid token" });
            res.json({ message: "User authenticated", userId: decoded.id });
        });
    } catch (err) {
        res.status(500).json({ message: "Error authenticating user", error: err });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
