import db from "../config/db.js"; // your mysql2 pool/connection
import { sendOrderConfirmationEmail } from "../emailConfirmation.js";

export const sendOrderEmailByOrderId = async (orderId) => {
  const [rows] = await db.query(
    `SELECT 
      o.id AS order_id,
      o.order_number,
      o.total_amount,
      o.discount_amount,
      o.shipping_charges,
      o.final_amount,
      o.status,
      u.firstname,
      u.lastname,
      u.email AS customer_email,
      oi.quantity,
      oi.price,
      oi.total_price,
      p.name AS product_name,
      c.name AS color_name
    FROM orders o
    JOIN users u ON u.id = o.user_id
    JOIN order_items oi ON oi.order_id = o.id
    JOIN products p ON p.id = oi.product_id
    LEFT JOIN colors c ON oi.color_id = c.id
    WHERE o.id = ?`,
    [orderId]
  );

  if (rows.length === 0) {
    throw new Error("Order not found");
  }

  const first = rows[0];

  const orderData = {
    customerName: `${first.firstname} ${first.lastname}`,
    customerEmail: first.customer_email,
    order_number: first.order_number,
    total_amount: first.total_amount,
    discount_amount: first.discount_amount,
    shipping_charges: first.shipping_charges,
    final_amount: first.final_amount,
    status: first.status,
    items: rows.map((row) => ({
      name: row.product_name + (row.color_name ? ` (${row.color_name})` : ""),
      quantity: row.quantity,
      price: row.price,
    })),
  };

  await sendOrderConfirmationEmail(orderData);
};