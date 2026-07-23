import { useLocation } from "react-router-dom";
import TopHeader from "./TopHeader";
import MyNavbar from "./Navbarcustom";

const OrderSuccess = () => {
    const location = useLocation();
    const { orderId, cartItems = [], total = 0,
        paymentMethod,
        address } = location.state || {};

    return (
        <div className="order-success">
            <TopHeader />
            <MyNavbar />
       <button className="btn btn-outline-dark ms-3" onClick={()=>window.history.back()}>←Back</button>
            <div className="p-3">
                <h1>Order Placed Successfully!</h1>
                <h4>Order Id: {orderId}</h4>
                <p>Thank you for your purchase. Your order has been placed and is being processed.</p>
            </div>
            <div className="card p-3 mt-4">
                <h3>Delivery Address</h3>
                <p>{address}</p>

                <h3>Payment Method</h3>
                <p>{paymentMethod}</p>

                <h3>Order Items</h3>

                {cartItems.map((item) => (
                    <div key={item.product_id}>
                        <strong>{item.name}</strong>
                        <p>
                            Rs. {item.price} × {item.quantity}
                        </p>
                    </div>
                ))}

                <hr />

                <h2>Total: Rs. {total}</h2>
            </div>
        </div>
    );
}
export default OrderSuccess;