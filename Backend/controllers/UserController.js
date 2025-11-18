import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Please fill all required fields", success: "no" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email", success: "no" });
    }

    // Check if user exists
    const isExist = await User.findOne({ email });
    if (isExist) return res.status(400).json({ message: "Email already exists", success: "no" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not defined!");
      return res.status(500).json({ message: "Server configuration error", success: "no" });
    }

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      success: "yes",
      data: { _id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role, token }
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message, success: "no" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Fill all fields", success: "no" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials", success: "no" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials", success: "no" });

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not defined!");
      return res.status(500).json({ message: "Server configuration error", success: "no" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2d" });

    res.status(200).json({
      message: "Login successful",
      success: "yes",
      data: { _id: user._id, name: user.name, email: user.email, role: user.role, token }
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message, success: "no" });
  }
};
// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; 

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found", success: "no" });

    res.status(200).json({ success: "yes", data: user });
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    res.status(500).json({ message: error.message, success: "no" });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // req.user should come from auth middleware
    const { name, email, password } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found", success: "no" });

    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({
      success: "yes",
      message: "Profile updated successfully",
      data: { _id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({ message: error.message, success: "no" });
  }
}