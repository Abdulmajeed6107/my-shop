import db from "../config/db.js";

// GET all master colors (for dropdown)
export const getAllColors = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM colors`);
    res.json(rows);
  } catch (err) {
    console.error("getAllColors error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET all colors for a product
export const GetProductColor = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT pc.id, pc.color_id, pc.stock, pc.extra_price, c.name, c.hex_code
      FROM product_colors pc
      JOIN colors c ON pc.color_id = c.id
      WHERE pc.product_id = ?
    `, [req.params.id]);
    res.json(rows);
  } catch (err) {
    console.error("GetProductColor error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ADD a color to a product
export const AddColor = async (req, res) => {
  try {
    const { color_id, stock, extra_price } = req.body;
    await db.query(
      `INSERT INTO product_colors (product_id, color_id, stock, extra_price)
       VALUES (?, ?, ?, ?)`,
      [req.params.id, color_id, stock || 0, extra_price || 0]
    );
    res.json({ message: "Color added" });
  } catch (err) {
    console.error("AddColor error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE a color from product
export const DeleteColor = async (req, res) => {
  try {
    await db.query(
      `DELETE FROM product_colors WHERE product_id = ? AND id = ?`,
      [req.params.productId, req.params.colorId]
    );
    res.json({ message: "Color removed" });
  } catch (err) {
    console.error("DeleteColor error:", err);
    res.status(500).json({ message: "Server error" });
  }
};