import { useEffect, useState } from "react";
import { fetchMyOrders } from "../services/api_myorders";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await fetchMyOrders();
                setOrders(data.orders);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    if (loading) return <p>Loading your orders...</p>;
    if (error) return <p>Error: {error}</p>;
    if (orders.length === 0) return <p>You haven't placed any orders yet.</p>;

    return (
        <div>
            <h2>My Orders</h2>
            {orders.map((order) => (
                <div key={order.order_id} style={{ border: "1px solid #ddd", padding: "16px", marginBottom: "16px" }}>
                    <h3>Order #{order.order_number}</h3>
                    <p>Status: {order.status}</p>
                    <p>Placed on: {new Date(order.created_at).toLocaleDateString()}</p>

                    <ul>
                        {order.items.map((item, idx) => (
                            <li key={idx}>
                                {item.product_id} __
                                {item.product_name} {item.color_name ? `(${item.color_name})` : ""} —
                                Qty: {item.quantity} — Rs. {item.price}
                                <img src={item.image} alt="order" className="ps-3"
                                    style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                                />
                                {order.status === "delivered" && (
                                    <button
                                        onClick={() =>
                                            navigate(`/product/productDetail/${product.product_id}?review=true`)
                                        }
                                    >
                                        Review Product
                                    </button>
                                )}
                            </li>

                        ))}
                    </ul>

                    <p><strong>Total: Rs. {order.final_amount} __</strong></p>

                </div>
            ))}

        </div>
    );
};

export default MyOrders;