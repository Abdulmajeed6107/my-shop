import db from "../config/db.js";
import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';
import cloudinary from '../config/cloudinary.js';
import path from "path";
import os from "os";

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

    const { name, price, description, sku, category } = req.body;

    if (!req.file) {
        return res.status(400).json({
            status: false,
            message: "Image is required"
        });
    }

    const cloudinaryUrl = req.file.path;

    try {
        console.log("Cloudinary image:", cloudinaryUrl);

        // ------------------------------------------------
        // STEP 1: Download Cloudinary image
        // ------------------------------------------------

        console.log("Downloading image...");

        const response = await fetch(cloudinaryUrl);

        if (!response.ok) {
            throw new Error(
                `Failed to download image: ${response.status} ${response.statusText}`
            );
        }

        const imageBuffer = Buffer.from(await response.arrayBuffer());

        // Temporary directory
        const tempDir = os.tmpdir();

        const inputPath = path.join(
            tempDir,
            `product-${Date.now()}.jpg`
        );

        const outputPath = path.join(
            tempDir,
            `product-${Date.now()}-processed.png`
        );

        fs.writeFileSync(inputPath, imageBuffer);

        console.log("✅ Image downloaded:", inputPath);

        // ------------------------------------------------
        // STEP 2: Remove background
        // ------------------------------------------------

        // console.log("Starting background removal...");

        // const blob = await removeBackground(inputPath);

        // console.log("✅ Background removed successfully");

        // const processedBuffer = Buffer.from(
        //     await blob.arrayBuffer()
        // );

        // fs.writeFileSync(outputPath, processedBuffer);

        console.log("✅ Processed image saved:", outputPath);

        // ------------------------------------------------
        // STEP 3: Upload processed image to Cloudinary
        // ------------------------------------------------

        console.log("Uploading processed image...");

        const result = await cloudinary.uploader.upload(
            outputPath,
            {
                folder: "products"
            }
        );

        console.log(
            "✅ Processed image uploaded:",
            result.secure_url
        );

        const cleanedImage = result.secure_url;

        // ------------------------------------------------
        // STEP 4: Insert product into database
        // ------------------------------------------------

        const [newproduct] = await db.query(
            `INSERT INTO products
            (name, price, description, sku, image, category)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                name,
                price,
                description,
                sku,
                cleanedImage,
                category
            ]
        );

        console.log("✅ Product inserted into database");

        // ------------------------------------------------
        // STEP 5: Delete temporary files
        // ------------------------------------------------

        try {
            if (fs.existsSync(inputPath)) {
                fs.unlinkSync(inputPath);
            }

            if (fs.existsSync(outputPath)) {
                fs.unlinkSync(outputPath);
            }

            console.log("✅ Temporary files deleted");
        } catch (cleanupError) {
            console.log(
                "⚠️ Temporary file cleanup failed:",
                cleanupError.message
            );
        }

        // ------------------------------------------------
        // SUCCESS
        // ------------------------------------------------

        return res.status(201).json({
            status: true,
            message: "Item added to products successfully!",
            image_url: cleanedImage
        });

    } catch (error) {

        console.error("❌ AddProduct Error:", error);

        return res.status(500).json({
            status: false,
            message: "Failed to add product",
            error: error.message
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