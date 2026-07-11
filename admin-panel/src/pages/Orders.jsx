import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const getOrders = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`);
            const data = await response.json();
            setOrders(data.orders);
        } catch (e) {
            console.error("Orders fetch error:", e);

        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        getOrders();
    }, []
    );
    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between">
                <h1>All Orders</h1>
                <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            </div>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order) => (
                    <div className="card mb-3" key={order.id}>
                        <div className="card-body">
                            <h5 className="card-title">Order #{order.id}</h5>
                            <p className="card-text">Status: {order.status}</p>
                            <p className="card-text">Total: Rs. {order.total_amount}</p>
                            <p className="card-text">Date: {new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
