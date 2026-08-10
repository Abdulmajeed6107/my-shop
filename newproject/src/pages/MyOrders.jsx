import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMyOrders } from "../services/api_myorders";
import MyNavbar from "../components/Navbarcustom";
import TopHeader from "../components/TopHeader";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

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

    return (
        <>
            <MyNavbar />
            <TopHeader />

            <div className="container py-4">

                {loading && (
                    <p>Loading your orders...</p>
                )}

                {error && (
                    <p className="text-danger">
                        Error: {error}
                    </p>
                )}

                {!loading && !error && orders.length === 0 && (
                    <p>You haven't placed any orders yet.</p>
                )}

                {!loading && !error && orders.length > 0 && (
                    <>
                        <h2 className="mb-4">My Orders</h2>

                        {orders.map((order) => (
                            <div
                                key={order.order_id}
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "16px",
                                    marginBottom: "16px"
                                }}
                            >
                                <h3>Order #{order.order_number}</h3>

                                <p>
                                    Status: {order.status}
                                </p>

                                <p>
                                    Placed on:{" "}
                                    {new Date(
                                        order.created_at
                                    ).toLocaleDateString()}
                                </p>

                                <ul className="list-unstyled">

                                    {order.items.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="d-flex align-items-center gap-3 border-bottom py-3"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.product_name}
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    objectFit: "cover",
                                                    borderRadius: "4px"
                                                }}
                                            />

                                            <div className="flex-grow-1">
                                                <span className="text-muted me-2">
                                                    #{item.product_id}
                                                </span>

                                                <strong>
                                                    {item.product_name}
                                                </strong>

                                                {item.color_name && (
                                                    <span>
                                                        {" "}
                                                        ({item.color_name})
                                                    </span>
                                                )}

                                                <span className="ms-2">
                                                    — Qty: {item.quantity}
                                                </span>

                                                <span className="ms-2">
                                                    — Rs. {item.price}
                                                </span>
                                            </div>

                                            {order.status
                                                ?.trim()
                                                .toLowerCase() === "delivered" && (

                                                item.is_reviewed ? (
                                                    <span className="text-success small ms-auto">
                                                        ✓ Reviewed

                                                        {item.review?.rating &&
                                                            ` (${item.review.rating}★)`}
                                                    </span>
                                                ) : (
                                                    <button
                                                        className="btn btn-sm btn-outline-primary ms-auto"
                                                        onClick={() =>
                                                            navigate(
                                                                `/product/productDetail/${item.product_id}?review=true`
                                                            )
                                                        }
                                                    >
                                                        Review Product
                                                    </button>
                                                )
                                            )}
                                        </li>
                                    ))}

                                </ul>

                                <p>
                                    <strong>
                                        Total: Rs. {order.final_amount}
                                    </strong>
                                </p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    );
};

export default MyOrders;