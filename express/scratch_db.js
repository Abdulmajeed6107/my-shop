import db from './config/db.js';

async function checkCategories() {
  try {
    const [rows] = await db.query('SELECT DISTINCT category, COUNT(*) as count FROM products GROUP BY category');
    console.log('Categories in DB:');
    console.log(rows);
    process.exit(0);
  } catch (error) {
    console.error('Error querying DB:', error);
    process.exit(1);
  }
}

checkCategories();
