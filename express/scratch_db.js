import db from './config/db.js';

async function checkFabrics() {
  try {
    const keywords = ['lawn', 'cotton', 'summer', 'winter', 'khaddar', 'wool', 'velvet', 'karandi', 'silk', 'chiffon', 'georgette'];
    for (const keyword of keywords) {
      const [rows] = await db.query('SELECT COUNT(*) as count FROM products WHERE is_active = 1 AND (name LIKE ? OR description LIKE ?)', [`%${keyword}%`, `%${keyword}%`]);
      console.log(`Keyword: ${keyword} - Count: ${rows[0].count}`);
    }
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkFabrics();
