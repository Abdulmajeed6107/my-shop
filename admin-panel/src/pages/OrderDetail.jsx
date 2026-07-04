// pages/admin/OrderDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/orders/${id}`)
      .then(r => r.json())
      .then(data => {
        setOrder(data.order);
        setItems(data.items);
        setLoading(false);
      });
  }, [id]);

  const updateStatus = async (status) => {
    await fetch(`http://localhost:3000/api/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    setOrder(prev => ({ ...prev, status }));
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/orders')}>
        ← Back to Orders
      </button>

      <h3>Order #{id}</h3>

      {/* Order Info */}
      <div className="card mb-4">
        <div className="card-body">
          <p><strong>Customer:</strong> {order?.user_name}</p>
          <p><strong>Email:</strong> {order?.email}</p>
          <p><strong>Date:</strong> {new Date(order?.created_at).toLocaleString()}</p>
          <p><strong>Total:</strong> {order?.total} Rs.</p>

          {/* Status updater */}
          <div className="d-flex align-items-center gap-2">
            <strong>Status:</strong>
            <select
              className="form-select w-auto"
              value={order?.status}
              onChange={e => updateStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <h5>Items</h5>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Color</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>
                <img src={item.image} width={50} height={50}
                  style={{ objectFit: "cover" }} />
              </td>
              <td>{item.name}</td>
              <td>
                {item.color_name ? (
                  <div className="d-flex align-items-center gap-2">
                    <div style={{
                      width: 18, height: 18,
                      borderRadius: "50%",
                      backgroundColor: item.hex_code,
                      border: "1px solid #ccc"
                    }} />
                    {item.color_name}
                  </div>
                ) : "—"}
              </td>
              <td>{item.quantity}</td>
              <td>{item.price} Rs.</td>
              <td>{item.price * item.quantity} Rs.</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}