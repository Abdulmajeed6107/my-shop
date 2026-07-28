import db from '../config/db.js';

// GET /api/orders/my-orders
export const getMyOrders = async (req, res) => {
    const user_id = req.user.id; // pulled from JWT middleware, not the URL

    try {
        // Step 1 — get all orders for this user
        const [orders] = await db.query(
            `SELECT 
                o.id AS order_id,
                o.order_number,
                o.total_amount,
                o.discount_amount,
                o.shipping_charges,
                o.final_amount,
                o.status,
                o.payment_method,
                o.created_at
             FROM orders o
             WHERE o.user_id = ?
             ORDER BY o.created_at DESC`,
            [user_id]
        );

        if (orders.length === 0) {
            return res.json({ success: true, orders: [] });
        }

        // Step 2 — get all items for these orders in one query
        const orderIds = orders.map(o => o.order_id);
        const [items] = await db.query(
            `SELECT 
                oi.order_id,
                oi.product_id,
                oi.quantity,
                oi.price,
                oi.total_price,
                p.name AS product_name,
                p.image,
                c.name AS color_name,
                c.hex_code
             FROM order_items oi
             JOIN products p ON p.id = oi.product_id
             LEFT JOIN colors c ON oi.color_id = c.id
             WHERE oi.order_id IN (?)`,
            [orderIds]
        );

        // Step 3 — group items under their respective order
        const ordersWithItems = orders.map(order => ({
            ...order,
            items: items.filter(item => item.order_id === order.order_id)
        }));

        res.json({ success: true, orders: ordersWithItems });

    } catch (err) {
        console.error("Error fetching user orders:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};