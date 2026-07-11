import db from '../config/db.js';
import { io } from "../index.js";


export const placeOrder = async (req, res) => {
    const { user_id, cartItems, total, payment } = req.body;

    if (!user_id || !cartItems?.length || !total || !payment) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const conn = await db.getConnection();

    try {
        await conn.beginTransaction();

        // Step 1 — get shipping address
        const [addressRows] = await conn.query(
            "SELECT id FROM addresses WHERE user_id = ? LIMIT 1",
            [user_id],
        );

        if (addressRows.length === 0) {
            await conn.rollback();
            return res.status(400).json({
                success: false,
                message: "No shipping address found. Please add an address first."
            });
        }

        const shipping_address_id = addressRows[0].id;


        // Step 2 — create order
        const paymentMethodMap = {
            "Cash on Delivery": "cod",
            "Debit Card or Credit Card": "razorpay",
            "JazzCash": "stripe",
            "EasyPaisa": "paypal"
        };

        const dbPaymentMethod = paymentMethodMap[payment.method] || "cod";
        const order_number = `ORD-${Date.now()}`;

        const [order] = await conn.query(
            `INSERT INTO orders 
                (user_id, order_number, total_amount, final_amount, payment_method, shipping_address_id) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [user_id, order_number, total, total, dbPaymentMethod, shipping_address_id]
        );
        const orderId = order.insertId;

        // Step 3 — save order items

        io.emit("newOrder", {
            message: "New order received",
            orderId: orderId
        });

        for (const item of cartItems) {
            await conn.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price, total_price, color_id) VALUES (?, ?, ?, ?, ?, ?)',
                [orderId, item.product_id, item.quantity, item.price, item.price * item.quantity, item.color_id || null]
            );
        }

        // Step 4 — save payment
        await conn.query(
            'INSERT INTO payments (order_id, payment_method, account_name, account_number, amount) VALUES (?, ?, ?, ?, ?)',
            [orderId, payment.method, payment.name, payment.number, total]
        );

        // Step 5 — clear cart
        await conn.query(
            'DELETE FROM cart_items WHERE user_id = ?',
            [user_id]
        );

        await conn.commit();
        return res.json({ success: true, orderId });

    } catch (err) {
        await conn.rollback();
        console.error('Full error:', err);
        return res.status(500).json({ success: false, message: err.message, code: err.code });

    } finally {
        conn.release();
    }
};
// GET /api/orders/:id — single order with items
export const GetOrder = async (req, res) => {
    // router.get('/orders/:id', 
    const [order] = await db.query(
        `SELECT o.*, u.firstname AS user_name, u.email
     FROM orders o
     JOIN users u ON o.user_id = u.id
     WHERE o.id = ?`, [req.params.id]
    );

    const [items] = await db.query(
        `SELECT oi.*, p.name, p.image, p.price,
            c.name AS color_name, c.hex_code
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     LEFT JOIN colors c ON oi.color_id = c.id
     WHERE oi.order_id = ?`, [req.params.id]
    );

    res.json({ order: order[0], items });
};

// PUT /api/orders/:id/status — update status
export const UpdateOrder = async (req, res) => {
    console.log("HIT status update:", req.params.id, req.body.status);

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    const { status } = req.body;

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        const [result] = await db.query(
            `UPDATE orders SET status = ? WHERE id = ?`,
            [status, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ message: 'Status updated' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// recent orders last 10 
export const RecentOrders = async (req, res) => {

    try {
        const [orders] = await db.query(`
      SELECT o.id, o.order_number, o.status, o.created_at,
             u.firstname, u.lastname
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
      LIMIT 10
    `);
        res.json({ success: true, orders });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};