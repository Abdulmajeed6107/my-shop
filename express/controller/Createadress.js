import db from '../config/db.js';

export const CreateAdress = async (req, res) => {
    const {
        user_id,
        full_name,
        phone,
        address_line1,
        address_line2,
        city,
        state,
        pincode,
        country,
        latitude,
        longitude
    } = req.body;

    try {
        const [result] = await db.query(
            `INSERT INTO addresses (
                user_id,
                address_type,
                full_name,
                phone,
                address_line1,
                address_line2,
                city,
                state,
                pincode,
                country,
                latitude,
                longitude
            ) VALUES (?, 'shipping', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                user_id,
                full_name,
                phone,
                address_line1,
                address_line2,
                city,
                state,
                pincode,
                country,
                latitude,
                longitude
            ]
        );

        return res.json({
            success: true,
            message: "Location saved",
            addressId: result.insertId
        });

    } catch (err) {
        console.error("CreateAdress error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to save address",
            error: err.message
        });
    }
};