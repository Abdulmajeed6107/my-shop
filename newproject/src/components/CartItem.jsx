import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LocationMap from "./LocationMap";
import { useCart } from "../hooks/useCart";

const Cart = () => {
    // const [cartItems, setCartItems] = useState([]);
    // const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [userLocation, setUserLocation] = useState(null);

    const { cartItems, loading, fetchCartItems } = useCart();

    const saveLocation = (location) => {

        console.log(location);
        setUserLocation(location);
        // Save to localStorage
        localStorage.setItem("userLocation", JSON.stringify(location));
    };

    const savedUser = localStorage.getItem("user");
    const user_id = savedUser ? JSON.parse(savedUser).id : null;

    useEffect(() => {
        console.log("🔍 CartPage loaded with user_id:", user_id);

        if (!user_id) {
            alert("Please login to view your cart");
            navigate('/login');
            return;
        }

        fetchCartItems(user_id);
    }, [user_id]);
    
        // fetchCartItems(user_id);

    //  const fetchCartItems = async () => {
    //     try {
    //         console.log(`📡 Fetching cart for user: ${user_id}`);
    //         const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cartitems/${user_id}`);

    //         console.log("📦 API Response:", res.data);
    //         console.log("🖼️ First item image value:", res.data.cart?.[0]?.image);

    //         if (res.data.success) {
    //             const items = res.data.cart || [];

    //             setCartItems(items);

    //             //  Sync badge in TopHeader
    //             localStorage.setItem("cartItems", JSON.stringify(items));
    //             window.dispatchEvent(new Event("cartUpdated"));
    //         }
    //     } catch (error) {
    //         console.error(" Fetch error:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const removeItem = async (id) => {
        try {
            console.log("Deleting:", id);
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/removeFromCart/${id}`
            )
                .then(res => console.log(res.data))
                .catch(err => console.log(err));
            await fetchCartItems(user_id); // Refresh cart items after deletion
        } catch (error) {

            console.log("URL:", error.config?.url);
            console.log("Method:", error.config?.method);
            console.log("Response:", error.response?.data);
            console.error(error);
        }
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (loading) return <h2 className="text-center py-10">Loading your cart...</h2>;

    return (

        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Your Cart ({cartItems.length} items)</h1>

            {!user_id && <p className="text-red-600">No user ID found. Please login again.</p>}

            {cartItems.length === 0 ? (
                <div className="text-center py-20">
                    <h3 className="text-2xl">Your cart is empty</h3>
                    <button
                        onClick={() => navigate('/products')}
                        className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg"
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (

                // Your cart items mapping code here...

                cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center border p-4 mb-4 rounded-lg">
                        <div className="flex gap-6">
                            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover"
                                style={{
                                    width: '156px',
                                    height: '326px',
                                    // objectFit: 'cover',
                                    // minWidth: '96px'  // prevents stretching
                                }}
                            />
                            <div>
                                <h4>{item.name}</h4>
                                <p>${item.price} × {item.quantity}</p>
                                {item.color_name && (
                                    <div className="d-flex align-items-center gap-1">
                                        <div style={{
                                            width: 16, height: 16,
                                            borderRadius: '50%',
                                            backgroundColor: item.hex_code,
                                            border: '1px solid #ccc'
                                        }} />
                                        <small className="text-muted">{item.color_name}</small>
                                    </div>
                                )}
                            </div>

                        </div>

                        <div>

                            <p className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                            <button onClick={() => removeItem(item.id)} className="text-red-600">Remove</button>
                        </div>
                    </div>
                ))
            )}

            {cartItems.length > 0 && (
                <>
                    <div className="text-3xl font-bold text-right mt-8">
                        Total: ${total.toFixed(2)}
                    </div>

                    {/* MAP ADDED HERE */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-3">
                            Select Delivery Location
                        </h2>

                        <LocationMap setUserLocation={saveLocation} />
                    </div>
                </>
            )}
            <button className="bg-green px-8 py-3 rounded-lg mt-6" onClick={() => navigate('/cartsummary', { state: { cartItems, userLocation } })}>Go to Checkout</button>
        </div>

    );
};

export default Cart;