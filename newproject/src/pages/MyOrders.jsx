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

                    <ul className="list-unstyled">
                        {order.items.map((item, idx) => (
                            <li
                                key={idx}
                                className="d-flex align-items-center gap-3 border-bottom py-3"
                            >
                                <img
                                    src={item.image}
                                    alt="order"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                    }}
                                />

                                <div className="flex-grow-1">
                                    <div className="fw-semibold">{item.product_name}</div>
                                    {item.color_name && (
                                        <div className="text-muted small">{item.color_name}</div>
                                    )}
                                    <div className="small">
                                        Qty: {item.quantity} &nbsp;|&nbsp; Rs. {item.price}
                                    </div>
                                    <div className="text-muted small">ID: {item.product_id}</div>
                                </div>

                                {order.status === "delivered" && (
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() =>
                                            navigate(`/product/productDetail/${item.product_id}?review=true`)
                                        }
                                    >
                                        Review Product
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>

                    <p><strong>Total: Rs. {order.final_amount}</strong></p>

                </div>
            ))}

        </div>
    );
};

export default MyOrders;