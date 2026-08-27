
import bycrypt from 'bcrypt';
import db from '../config/db.js';

export const ResetPassword = async (req, res) => {
    
    const { token } = req.params;
    const { password } = req.body;

    const [rows] = await db.query(
        'SELECT id FROM users WHERE resetToken = ? AND resetTokenExpiry > ?',
        [token, Date.now()]
    );

    if (rows.length === 0) {
        return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
        'UPDATE users SET password = ?, resetToken = NULL, resetTokenExpiry = NULL, update_at = NOW() WHERE resetToken = ?',
        [hashedPassword, token]
    );

    res.json({ message: 'Password updated successfully.' });
}
