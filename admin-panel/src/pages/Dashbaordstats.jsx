import { useEffect, useState } from 'react';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
// import axiosInstance from '../utils/axiosInstance';

const DashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/stats/`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading Dashboard...</div>;

  const { stats: s, recentOrders = [], lowStock = [] } = stats || {};

  const statCards = [
    {
      title: "Total Revenue",
      value: `${Number(s?.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "bg-green-500"
    },
    {
      title: "Total Orders",
      value: s?.totalOrders || 0,
      icon: ShoppingCart,
      color: "bg-blue-500"
    },
    {
      title: "Total Users",
      value: s?.totalUsers || 0,
      icon: Users,
      color: "bg-purple-500"
    },
    {
      title: "Total Products",
      value: s?.totalProducts || 0,
      icon: Package,
      color: "bg-orange-500"
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen text-center">

      <div className="mb-8">
        <button className="btn btn-secondary mb-3 mt-3" onClick={() => window.location.href = '/dashboard'}>
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <p className="text-3xl font-bold mt-3">{card.value}</p>
              </div>
              <div className={`${card.color} p-4 rounded-xl text-white`}>
                <card.icon size={32} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="card flex justify-between items-center border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">{order.userName || 'Customer'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${Number(order.totalAmount).toFixed(2)}</p>
                    <span className={`text-xs px-3 py-1 rounded-full 
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent orders</p>
            )}
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">Low Stock Alert</h2>
          {lowStock.length > 0 ? (
            lowStock.map((product) => (
              <div key={product.id} className="mb-4 p-4 border border-red-200 rounded-lg">
                <p className="font-medium">{product.name}</p>
                <p className="text-red-600 font-semibold">Only {product.stock} left in stock</p>
              </div>
            ))
          ) : (
            <p className="text-green-600">All products have good stock levels.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;