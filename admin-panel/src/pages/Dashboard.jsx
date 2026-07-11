import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import DashboardStats from './Dashbaordstats';
import AdminLogin from "./AdminLogin";

const socket = io(`${import.meta.env.VITE_API_URL}`);

function Dashboard() {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);

    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!storedUser || !token) {
            navigate("/admin/login");
            return;
        }

        const user = JSON.parse(storedUser);

        if (user.role !== "admin") {
            alert("Access denied. Admins only.");
            navigate("/");
            return;
        }

        setAdmin(user);
    }, [navigate]);

    // fetch recent pending orders on mount (in case you missed them)
    useEffect(() => {

        fetch(`${import.meta.env.VITE_API_URL}/api/orders/recent`)
            .then(r => r.json())
            .then(data => {
                console.log("recent orders:", data); // check this in console first

                if (data.success) {
                    setNotifications(data.orders.map(o => ({
                        message: `Order #${o.id} — ${o.firstname} ${o.lastname}`,
                        orderId: o.id,
                        fromDB: true   // mark as existing order
                    })));
                }
            });
    }, []);

    // listen for new live orders via socket

    useEffect(() => {
        socket.on("newOrder", (data) => {
            console.log("New order:", data);
            setNotifications(prev => {
                // avoid duplicates
                const exists = prev.some(n => n.orderId === data.orderId);
                if (exists) return prev;
                return [...prev, data];
            })
        });
        return () => socket.off("newOrder");
    }, []);

    return (
        <div className="ps-5 mt-5">
            <h1>Admin Dashboard</h1>
            <div className="mb-3 d-flex align-items-center justify-content-center gap-3">
                <button onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    navigate("/");
                }}>
                    Logout
                </button>
            </div>

            {/* Notifications */}
            {notifications.length > 0 && (
                <div className="mb-4">
                    <h5>🔔 New Orders ({notifications.length})</h5>
                    {notifications.map((item, index) => (
                        <div
                            key={index}
                            className="d-flex align-items-center justify-content-between p-3 mb-2 border rounded"
                            style={{ backgroundColor: "#fff8e1", maxWidth: 500 }}
                        >
                            <div>
                                <span>🔔 {item.message}</span>
                                <br />
                                <small className="text-muted">Order ID: #{item.orderId}</small>
                            </div>

                            {/*  view button */}
                            <button
                                className="btn btn-sm btn-primary"
                                onClick={() => navigate(`/orders/${item.orderId}`)}
                            >
                                View
                            </button>

                        </div>
                    ))}
                </div>
            )}

            <div className="d-flex gap-3 mt-3 mb-5">
                <button onClick={() => navigate('/Products')}>Products</button>
                <button onClick={() => navigate('/orders')}>Orders</button>
                <button onClick={() => navigate('/users')}>Users</button>
                <button onClick={() => navigate('/dashboardstats')}>Stats</button>
            </div>
        </div>
    );
}

export default Dashboard;