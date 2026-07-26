import 'dotenv/config';
import transporter from './services/sendOrderEmail.js';

export const sendOrderConfirmationEmail = async (order) => {
  try {
    const { customerName, customerEmail, orderId, items, totalAmount, shippingAddress } = order;

    const itemsHtml = items
      .map(
        (item) => `
        <tr>
          <td style="padding:8px;border:1px solid #ddd;">${item.name}</td>
          <td style="padding:8px;border:1px solid #ddd;text-align:center;">${item.quantity}</td>
          <td style="padding:8px;border:1px solid #ddd;text-align:right;">Rs. ${item.price}</td>
        </tr>`
      )
      .join("");

    const html = `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
        <h2>Thank you for your order, ${customerName}!</h2>
        <p>Your order <strong>#${orderId}</strong> has been received.</p>

        <table style="width:100%; border-collapse:collapse; margin:20px 0;">
          <thead>
            <tr style="background:#f5f5f5;">
              <th style="padding:8px;border:1px solid #ddd;text-align:left;">Item</th>
              <th style="padding:8px;border:1px solid #ddd;">Qty</th>
              <th style="padding:8px;border:1px solid #ddd;text-align:right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <p><strong>Total: Rs. ${totalAmount}</strong></p>

        <h4>Shipping Address:</h4>
        <p>${shippingAddress}</p>

        <p>We'll notify you once your order ships. Thank you for shopping with Bhatti Clothing!</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: customerEmail,
      subject: `Order Confirmation - #${orderId}`,
      html,
    });

    console.log("Order email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("Failed to send order email:", err);
    throw err;
  }
};