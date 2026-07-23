
import db from '../config/db.js';

 export const createReview = async (req, res) => {
    try {
        const { product_id, user_id, rating, comment } = req.body;

        // Validate input
        if (!product_id || !user_id || !rating) {
            return res.status(400).json({
                success: false,
                message: "Product, user and rating are required."
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5."
            });
        }

        await db.query(
            `INSERT INTO reviews (product_id, user_id, rating, comment)
             VALUES (?, ?, ?, ?)`,
            [product_id, user_id, rating, comment]
        );

        return res.status(201).json({
            success: true,
            message: "Review added successfully."
        });

    } catch (error) {
        console.error("Create Review Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};

export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        const [reviews] = await db.query(
            `SELECT
                r.id,
                r.rating,
                r.comment,
                r.created_at,
                u.firstname,
                u.lastname
             FROM reviews r
             JOIN users u
               ON r.user_id = u.id
             WHERE r.product_id = ?
             ORDER BY r.created_at DESC`,
            [productId]
        );

        res.status(200).json({
            success: true,
            reviews
        });

    } catch (error) {
        console.error("Get Reviews Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};