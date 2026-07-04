const db = require('../config/db'); // Your MySQL connection file

const getDashboardStats = async (req, res) => {
  try {
    // Total Stats
    const [totalRevenueResult] = await db.execute(`
      SELECT COALESCE(SUM(totalAmount), 0) as totalRevenue 
      FROM orders 
      WHERE status = 'delivered'
    `);

    const [totalOrdersResult] = await db.execute(`SELECT COUNT(*) as totalOrders FROM orders`);
    const [totalUsersResult] = await db.execute(`SELECT COUNT(*) as totalUsers FROM users`);
    const [totalProductsResult] = await db.execute(`SELECT COUNT(*) as totalProducts FROM products`);

    // Today's Stats
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const [todayOrdersResult] = await db.execute(`
      SELECT COUNT(*) as todayOrders 
      FROM orders 
      WHERE DATE(createdAt) = ?
    `, [today]);

    const [todayRevenueResult] = await db.execute(`
      SELECT COALESCE(SUM(totalAmount), 0) as todayRevenue 
      FROM orders 
      WHERE status = 'delivered' AND DATE(createdAt) = ?
    `, [today]);

    // Low Stock Products
    const [lowStock] = await db.execute(`
      SELECT id, name, stock, price 
      FROM products 
      WHERE stock <= 10 
      ORDER BY stock ASC 
      LIMIT 5
    `);

    // Recent Orders
    const [recentOrders] = await db.execute(`
      SELECT o.id, o.totalAmount, o.status, o.createdAt,
             u.name as userName, u.email 
      FROM orders o
      LEFT JOIN users u ON o.userId = u.id
      ORDER BY o.createdAt DESC 
      LIMIT 5
    `);

    res.json({
      stats: {
        totalRevenue: totalRevenueResult[0].totalRevenue,
        totalOrders: totalOrdersResult[0].totalOrders,
        totalUsers: totalUsersResult[0].totalUsers,
        totalProducts: totalProductsResult[0].totalProducts,
        todayRevenue: todayRevenueResult[0].todayRevenue,
        todayOrders: todayOrdersResult[0].todayOrders,
      },
      lowStock,
      recentOrders
    });

  } catch (error) {
    console.error('Dashboard Stats Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getDashboardStats };