import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import Config from '../Configuration/Config.js'

//Model Schema
import User from '../Model/User_Model.js'
import Product from "../Model/Product_Model.js"; 


//To Create the user
export const registerUser = async (req, res) => {
    try {
        const { UserName, Email, Password, Role} = req.body;

        if (!UserName || !Email || !Password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        console.log(`Received request to register user with email: ${Email}`);

        let user = await User.findOne({ Email });
        if (user) {
            return res.status(409).json({ message: "User already exists" });
        }

        const lastUser = await User.findOne().sort({ UserId: -1 });
        const newUserId = lastUser ? lastUser.UserId + 1 : 100; // Start from 100

        user = new User({
            UserId: newUserId,
            UserName,
            Email,
            Password,
            Role
        })

        user.Password = await bcrypt.hash(Password, 10);
        await user.save();

        console.log(`User registered successfully with email: ${Email}`);
        return res.status(201).json({ message: "Success" });
    } catch (err) {
        console.error(`Error occurred during registration: ${err.message}`);
        res.status(500).json({ message: "Internal server error" }); 
    }
};

//To Login User
export const loginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        console.log("Email and Password",req.body)

        if (!Email || !Password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { UserId: user.UserId, Role: user.Role },
            Config.secretOrKey,
            { expiresIn: "1h" }
        );

        console.log("Login SuccesFully",user.Role,user.Email)

        res.status(200).json({ message: "Login successful", token, role: user.Role });
    } catch (err) {
        console.error(`Error during login: ${err.message}`);
        res.status(500).json({ message: "Internal server error" });
    }
};

//To View All the User
export const userall = async (req, res) => {
    try {
        const users = await User.find({Role:"User"});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}

//To View All the Vendor
export const vendorall = async (req, res) => {
    try {
        const users = await User.find({Role:"Vendor"});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}

//To View All the Staff
export const staffall = async (req, res) => {
    try {
        const users = await User.find({Role:"Staff"});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        // Compute discount details dynamically
        const productsWithVendorDetails = await Promise.all(
            products.map(async (product) => {
                const vendor = await User.findOne({ UserId: product.vendor }); // Find vendor by UserId (Number)
                return { 
                    ...product.toObject(), 
                    vendorInfo: vendor 
                        ? { UserName: vendor.UserName, Email: vendor.Email, Role: vendor.Role } 
                        : null,
                    oldPrice: parseFloat(product.oldPrice).toFixed(2),
                    newPrice: parseFloat(product.newPrice).toFixed(2),
                    deliveryAmount: parseFloat(product.deliveryAmount).toFixed(2),
                    discountAmount: (product.oldPrice - product.newPrice).toFixed(2),
                    discountPercentage: ((product.oldPrice - product.newPrice) / product.oldPrice * 100).toFixed(2),
                };
            })
        );

        res.status(200).json(productsWithVendorDetails);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products", error });
    }
};
