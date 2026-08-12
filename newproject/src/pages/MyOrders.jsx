import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TopHeader from "../components/TopHeader";
import MyNavbar from "../components/Navbarcustom";
import Footer from "../components/Footer";
import { fetchMyOrders } from "../services/api_myorders";
import { buildImageUrl } from "../config/api";
import "./MyOrders.css";

const STATUS_CLASS = {
  pending: "status-pending",
  processing: "status-processing",
  shipped: "status-shipped",
  delivered: "status-delivered",
  cancelled: "status-cancelled",
};

const getStatusClass = (status) => {
  const key = status?.trim().toLowerCase();
  return STATUS_CLASS[key] || "status-default";
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchMyOrders();
        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleLoginRedirect = () => navigate("/login");

  return (
    <>
      <TopHeader />
      <MyNavbar />

      <div className="container py-4 my-orders-page">
        <div className="my-orders-header">
          <h2 className="mb-1">My Orders</h2>
          <p className="text-muted mb-0">Track and manage your purchases</p>
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading your orders...</p>
          </div>
        )}

        {!loading && error && (
          <div className="alert alert-danger d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
            <span>{error}</span>
            {(error.includes("log in") || error.includes("Session expired")) && (
              <button className="btn btn-dark btn-sm" onClick={handleLoginRedirect}>
                Go to Login
              </button>
            )}
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="order-empty-state">
            <i className="bi bi-bag-x d-block"></i>
            <h4>You haven&apos;t placed any orders yet</h4>
            <p className="mb-4">Start shopping and your orders will appear here.</p>
            <Link to="/products" className="btn btn-dark">
              Browse Products
            </Link>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="d-flex flex-column gap-4">
            {orders.map((order) => (
              <div key={order.order_id} className="card shadow-sm order-card">
                <div className="order-card-header d-flex flex-wrap justify-content-between align-items-center gap-2">
                  <div>
                    <h5 className="mb-1">Order #{order.order_number}</h5>
                    <small className="text-muted">
                      Placed on {new Date(order.created_at).toLocaleDateString("en-PK", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </small>
                  </div>
                  <span className={`order-status-badge ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div className="card-body p-0">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="order-item-row d-flex align-items-center gap-3">
                      <img
                        src={buildImageUrl(item.image)}
                        alt={item.product_name}
                        className="order-item-img"
                      />
                      <div className="flex-grow-1">
                        <div className="fw-semibold">{item.product_name}</div>
                        <div className="text-muted small">
                          {item.color_name && <span>{item.color_name} · </span>}
                          Qty: {item.quantity} · Rs. {Number(item.price).toLocaleString()}
                        </div>
                      </div>

                      {order.status?.trim().toLowerCase() === "delivered" && (
                        item.is_reviewed ? (
                          <span className="text-success small text-nowrap">
                            <i className="bi bi-check-circle-fill me-1"></i>
                            Reviewed
                            {item.review?.rating && ` (${item.review.rating}★)`}
                          </span>
                        ) : (
                          <button
                            className="btn btn-sm btn-outline-dark text-nowrap"
                            onClick={() =>
                              navigate(`/product/productDetail/${item.product_id}?review=true`)
                            }
                          >
                            Review
                          </button>
                        )
                      )}
                    </div>
                  ))}
                </div>

                <div className="card-footer bg-white d-flex flex-wrap justify-content-between align-items-center gap-2 py-3">
                  <span className="text-muted small">
                    Payment: {order.payment_method || "N/A"}
                  </span>
                  <strong className="fs-5">
                    Total: Rs. {Number(order.final_amount).toLocaleString()}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default MyOrders;
