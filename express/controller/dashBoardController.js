import db from '../config/db.js';

export const getDashboardStats = async (req, res) => {
  try {
    // Total Stats
    const [revenue] = await db.query(`
    SELECT COALESCE(SUM(final_amount),0) AS totalRevenue
    FROM orders
    WHERE status='delivered'
`);

    const [totalOrdersResult] = await db.execute(`SELECT COUNT(*) as totalOrders FROM orders`);
    const [totalUsersResult] = await db.execute(`SELECT COUNT(*) as totalUsers FROM users`);
    const [totalProductsResult] = await db.execute(`SELECT COUNT(*) as totalProducts FROM products`);

    // Today's Stats
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const [todayOrdersResult] = await db.execute(`
      SELECT COUNT(*) as todayOrders 
      FROM orders 
      WHERE DATE(created_at) = ?
    `, [today]);

    const [todayRevenueResult] = await db.execute(`
      SELECT COALESCE(SUM(total_amount), 0) as todayRevenue 
      FROM orders 
      WHERE status = 'delivered' AND DATE(created_at) = ?
    `, [today]);

    // Low Stock Products
    // const [lowStock] = await db.execute(`
    //   SELECT id, name, stock, price 
    //   FROM products 
    //   WHERE stock <= 10 
    //   ORDER BY stock ASC 
    //   LIMIT 5
    // `);

    // Recent Orders
    const [recentOrders] = await db.query(`
    SELECT
        o.id,
        o.order_number,
        o.final_amount AS totalAmount,
        o.status,
        o.created_at AS createdAt,
        CONCAT(u.firstname, ' ', u.lastname) AS userName,
        u.email
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id
    ORDER BY o.created_at DESC
    LIMIT 5
`);

    res.json({
      stats: {
        totalRevenue: revenue[0].totalRevenue,
        totalOrders: totalOrdersResult[0].totalOrders,
        totalUsers: totalUsersResult[0].totalUsers,
        totalProducts: totalProductsResult[0].totalProducts,
        todayRevenue: todayRevenueResult[0].todayRevenue,
        todayOrders: todayOrdersResult[0].todayOrders,
      },
      // lowStock,
      recentOrders
    });

  } catch (error) {
    console.error('Dashboard Stats Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
