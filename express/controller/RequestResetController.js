const crypto = require('crypto');
const nodemailer = require('nodemailer');

const ForgotPassword = async (req, res) => {
    const { email } = req.body;
    const [rows] = await db.query('SELECT id FROM users WHERE email = ? AND delete_at IS NULL', [email]);
    if (rows.length === 0) {
        return res.json({ message: 'If that email exists, a reset link has been sent.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = Date.now() + 3600000; // 1 hour

    await db.query(
        'UPDATE users SET resetToken = ?, resetTokenExpiry = ? WHERE email = ?',
        [token, expiry, email]
    );

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 1 hour.</p>`,
    });

    res.json({ message: 'If that email exists, a reset link has been sent.' });
}
module.exports = { ForgotPassword };