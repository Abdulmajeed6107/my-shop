import db from "../config/db.js";
import { buildImageUrl } from "../utils/ImageHelper.js";

// Add to cart
export const addToCart = async (req, res) => {
    const { user_id, product_id, quantity, color_id } = req.body;

    console.log("RAW color_id:", color_id);           // 👈 what is coming
    console.log("TYPE:", typeof color_id);
    
    console.log("BODY RECEIVED:", req.body);

    // 👇 convert 0, "", undefined all to null
    const safeColorId = color_id && color_id !== 0 ? color_id : null;

    try {
        // Check if item already exists
        const [existing] = await db.query(
            "SELECT * FROM `cart_items` WHERE user_id = ? AND product_id = ? AND color_id <=> ?",
            [user_id, product_id, safeColorId]
        );

        if (existing.length > 0) {
            // Update quantity
            await db.query(
                "UPDATE `cart_items` SET quantity = quantity + ? WHERE user_id = ? AND product_id = ? AND color_id <=> ?",
                [quantity, user_id, product_id, safeColorId]
            );
            return res.json({
                status: true,
                message: "Cart updated successfully!"
            });
        }

        // Insert new item
        await db.query(
            `INSERT INTO cart_items (user_id, product_id, quantity, color_id) VALUES (?, ?, ?,?)`,
            [user_id, product_id, quantity, color_id || null]
        );

        return res.json({
            status: true,
            message: "Item added to cart successfully!"
        });

    } catch (error) {
        console.error("Cart error:", error.message);
        return res.json({
            status: false,
            message: error.message
        });
    }
};

// Get cart items
export const cartItems = async (req, res) => {
    const user_id = req.params.user_id;


    try {
        const [items] = await db.query(
            `SELECT cart_items.id,cart_items.product_id,
             products.name, products.price, products.image, 
             cart_items.quantity, 
            cart_items.color_id, c.name AS color_name, 
            c.hex_code
             FROM cart_items
             JOIN products ON cart_items.product_id = products.id
             LEFT JOIN colors c ON cart_items.color_id = c.id
             WHERE cart_items.user_id = ?`,
            [user_id]
        );
        // map over items and build full image URL for each
        const cartWithImages = items.map(item => ({
            ...item,
            image: buildImageUrl(item.image)  // correctly applied to each item
        }));

        res.json({ success: true, cart: cartWithImages });

    } catch (error) {
        console.error("Cart fetch error:", error.message);
        res.json({ success: false, message: error.message });
    }
};

// Remove from cart
export const removeFromCart = async (req, res) => {

    console.log("Delete request received");
    console.log("ID:", req.params.id);

    const cartItemId = req.params.id;

    try {
        const [result] = await db.query(
            "DELETE FROM `cart_items` WHERE id = ?",
            [cartItemId]
        );

        console.log(result);

        res.json({ success: true, message: "Item removed from cart successfully!" });

    } catch (error) {
        console.error("Remove cart error:", error.message);
        res.json({ success: false, message: error.message });
    }
};