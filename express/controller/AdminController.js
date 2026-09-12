import db from "../config/db.js";
import fs from 'fs';
import cloudinary from '../config/cloudinary.js';
import path from "path";
import os from "os";
import { removeBackgroundAndUpload } from "../utils/bgRemover.js";

const adminSignup = async (req, res) => {

    const {
        username,
        firstname,
        lastname,
        email,
        password
    } = req.body;


    const hashPassword = await bcrypt.hash(password, 10);



    const sql = `
INSERT INTO users
(username,firstname,lastname,email,password,role)
VALUES(?,?,?,?,?,?)
`;



    db.query(
        sql,
        [
            username,
            firstname,
            lastname,
            email,
            hashPassword,
            "admin"
        ],
        (err, result) => {


            if (err) {
                return res.json({
                    status: false,
                    message: err.message
                })
            }


            res.json({
                status: true,
                message: "Admin created"
            })


        }

    )


}

// add product is from here

export const AddProduct = async (req, res) => {
    console.log("🔥🔥🔥 AddProduct function was called 🔥🔥🔥");

    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    const { name, price, description, sku, category, season } = req.body;
    const productSeason = season || "summer";

    if (!req.file) {
        return res.status(400).json({
            status: false,
            message: "Image is required"
        });
    }

    try {
        console.log("Original upload URL:", req.file.path);
        const cleanedImage = await removeBackgroundAndUpload(req.file.path);

        const [newproduct] = await db.query(
            `INSERT INTO products
            (name, price, description, sku, image, category, season)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                price,
                description,
                sku,
                cleanedImage,
                category,
                productSeason
            ]
        );

        console.log("✅ Product inserted into database");

        return res.status(201).json({
            status: true,
            message: "Item added to products successfully!",
            image_url: cleanedImage
        });

    } catch (error) {
        console.error("❌ AddProduct Error:", error);
        return res.status(500).json({
            status: false,
            message: error.message || "Failed to add product"
        });
    }
};
// to get all oders 
export const Orders = async (req, res) => {

    const sql = "SELECT * FROM orders";

    try {
        const [result] = await db.query(sql);

        return res.json({
            status: true,
            orders: result
        });
    }

    catch (err) {
        console.error("GetAllOrders error:", err);
        res.json({
            status: false,
            message: "unable to fetch the orders !"
        });
    }

}
// for getting specific order 
export const GetOrdersByUser = async (req, res) => {
    const { user_id } = req.params;
    const sql = "SELECT * FROM orders WHERE user_id = ?";

    try {
        const [result] = await db.query(sql, [user_id]);

        return res.json({
            status: true,
            orders: result
        });

    } catch (err) {
        console.error("GetOrdersByUser error:", err);
        return res.status(500).json({
            status: false,
            message: "Unable to fetch orders!"
        });
    }
};
export const Getusers = async (req, res) => {

    const sql = "SELECT * FROM users";

    try {
        const [result] = await db.query(sql);

        return res.json({
            status: true,
            users: result
        })
    } catch (e) {
        console.log(" error in Getting users", e);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch users!"
        })
    }
}