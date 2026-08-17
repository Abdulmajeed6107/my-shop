import db from "../config/db.js";
import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';
import cloudinary from '../config/cloudinary.js';

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
    console.log("Category:", req.body.category);

    const { name, price, description, sku, category } = req.body;

    // Image path from multer
    // const image = req.file ? `uploads/${req.file.filename}` : null;
    const image = req.file ? req.file.path : null;


    if (!image) {
        return res.status(400).json({ status: false, message: 'Image is required' });
    }

    const inputPath = req.file.path;
    const outputPath = `${inputPath}-processed.png`;

    try {

        // Step 1: Remove background
        console.log("Input path:", inputPath);

        console.log("Starting background removal...");
        const blob = await removeBackground(inputPath);
        const buffer = Buffer.from(await blob.arrayBuffer());
        fs.writeFileSync(outputPath, buffer);

        // Step 2: Upload cleaned image to Cloudinary
        const result = await cloudinary.uploader.upload(outputPath, {
            folder: 'products'
        });

        // Step 3: Clean up local temp files
        // fs.unlinkSync(inputPath);
        // fs.unlinkSync(outputPath);

        const image = result.secure_url;

        const newproduct = await db.query(
            "INSERT INTO `products` (name, price, description, sku, image, category ) VALUES (?, ?, ?, ?,?,?)",
            [name, price, description, sku, image, category]
        );
        return res.json({
            status: true,
            message: "Item added to products successfully!",
            image_url: image

        });

    } catch (error) {
        console.log("error", error)
        return res.status(500).json({ status: false, message: 'Failed to add product' });

    }

}
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