import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { placeOrder } from "./OrderPlace";


const CartSummary = () => {

    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
    const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [addressSaved, setAddressSaved] = useState(false);
    const location = useLocation();
    const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
    const [address, setAddress] = useState("Loading address...");
    const [userData, setUserData] = useState(null);
    const userLocation = location.state?.userLocation;
    const navigate = useNavigate();

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = user?.id;
    const userName = user ? `${user.firstname || ""} ${user.lastname || ""}` : "";
    const phone = user?.phonenumber || "00000000000";

    //save user location function


    const saveUserLocation = async (finalAddress, user_id, name, phone) => {

        await fetch('http://localhost:3000/api/addresses/create-address', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id,
                full_name: name,
                phone: phone,
                address_line1: finalAddress,
                address_line2: "",
                city: "Lahore",
                state: "Punjab",
                pincode: "54000",
                country: "Pakistan",
                latitude: userLocation?.latitude,
                longitude: userLocation?.longitude
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log("Location updated successfully");

                    setAddressSaved(true);

                } else {
                    console.log("Failed to update location");
                }
            })
            .catch(err => {
                if (err.name === 'AbortError') return;
                console.log("Error updating location:", err)
            });
    }




    const fetchAddress = async () => {
        try {

            console.log("User data:", { user_id, name, phone }); // debug log

            console.log("Logged user:", user);
            // Set UI state
            setUserData({ full_name: userName, phone: phone });

            // Fetch address from coordinates
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${userLocation.latitude}&lon=${userLocation.longitude}&format=json`,
                { headers: { 'Accept': 'application/json' } }
            );
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setAddress(data.display_name);

            // Save address — all data is ready
            await saveUserLocation(data.display_name, user_id, userName, phone);

        } catch (error) {
            console.log("fetchAddress error:", error);
            setAddress("Unable to fetch address");
        }
    };
    useEffect(() => {

        if (!userLocation) return;

        const user = JSON.parse(localStorage.getItem("user"));
        const user_id = user?.id;

        fetch(`http://localhost:3000/api/cartitems/${user_id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setCartItems(data.cart || []);
                }
            })
            .catch(err => console.log(err));



        fetchAddress();
    }, [userLocation]); // Empty dependency array to run only once on mount
    // Payment method icons
    const paymentIcons = {
        "Cash on Delivery": "💵",
        "Debit Card or Credit Card": "💳",
        "JazzCash": "📱",
        "EasyPaisa": "📲",
    };
    const handlePlaceOrder = async () => {
        if (!userLocation?.latitude || !userLocation?.longitude) {
            console.log("Location not available");
            return;
        }

        const result = await placeOrder(cartItems, total, {
            method: paymentMethod,
            name: accountName,
            number: accountNumber
        });

        if (result?.success) {

            // localStorage.setItem("cartItems", JSON.stringify([]));

            // clear react cart state
            setCartItems([]);

            // clear badge
            localStorage.setItem("cartItems", JSON.stringify([]));

            window.dispatchEvent(new Event("cartUpdated"));

            navigate("/OrderSuccess", {
                state: {
                    orderId: result.orderId, cartItems,
                    total,
                    paymentMethod,
                    address,
                    phone,
                }
            });
        } else {
            console.log("Order placement failed:", result?.message);
        }
    };

    return (

        <div className="container">
            <div className="row">

                {/* adress and payment details div   */}

                <div className="col-md-8">
                    <h1 className="text-3xl font-bold mb-8">Review and place your order

                    </h1>
                    <div className="border p-4 mb-4 rounded-lg">
                        <h3>Delivery address
                        </h3>
                        <p>{address}</p>
                    </div>
                    <div className="border p-4 mb-4 rounded-lg">
                        <h3>Personal details
                        </h3>
                        <p>{userData?.full_name || "John Doe"}</p>
                        <p>{userData?.phone || "+92 3143415032"}</p>
                    </div>

                    {/* Payment Method Section */}

                    <div className="border p-4 mb-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-3">Payment Method</h3>

                        <div className="flex flex-col gap-3">
                            {Object.keys(paymentIcons).map((method) => (
                                <label
                                    key={method}
                                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${paymentMethod === method
                                        ? "border-green-600 bg-green-50"
                                        : "border-gray-200 hover:border-green-400"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value={method}
                                        checked={paymentMethod === method}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="accent-green-600"
                                    />
                                    <span className="text-xl">{paymentIcons[method]}</span>
                                    <span className="font-medium">{method}</span>
                                </label>
                            ))}
                        </div>

                        {/* Show selected payment */}
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                                Selected: <span className="font-semibold text-green-700">{paymentMethod}</span>
                            </p>

                            {/* Show card fields only if card is selected */}
                            {paymentMethod === "Debit Card or Credit Card" && (
                                <div className="mt-3 flex flex-col gap-2">
                                    <input
                                        type="text"
                                        placeholder="Card Number"
                                        maxLength={16}
                                        className="border p-2 rounded-lg w-full"
                                        onChange={(e) => setAccountName(e.target.value)}

                                    />
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            maxLength={5}
                                            className="border p-2 rounded-lg w-full"
                                            onChange={(e) => setAccountNumber(e.target.value)}  // ✅ add this

                                        />
                                        <input
                                            type="text"
                                            placeholder="CVV"
                                            maxLength={3}
                                            className="border p-2 rounded-lg w-full"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Show JazzCash/EasyPaisa number field */}
                            {(paymentMethod === "JazzCash" || paymentMethod === "EasyPaisa") && (
                                <div className="mt-3">
                                    <input
                                        type="text"
                                        placeholder={`Enter ${paymentMethod} number`}
                                        maxLength={11}
                                        className="border p-2 rounded-lg w-full"
                                        onChange={(e) => setAccountNumber(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        className="bg-green-600 px-8 py-3 rounded-lg mt-6 w-full"
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </button>
                </div>

                {/* order summary div  */}
                <div className=" col-4 max-w-5xl mx-auto p-6">
                    <h3 className="text-3xl font-bold mb-8">Order Summary</h3>

                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <div>
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center border p-4 mb-4 rounded-lg">
                                    <div>

                                        <h4>{item.name}</h4>
                                        {/* 👇 show color if exists */}
                                        {item.color_name && (
                                            <div className="d-flex align-items-center gap-2 my-1">
                                                <div style={{
                                                    width: 16,
                                                    height: 16,
                                                    borderRadius: "50%",
                                                    backgroundColor: item.hex_code,
                                                    border: "1px solid #ccc"
                                                }} />
                                                <small className="text-muted">{item.color_name}</small>
                                            </div>
                                        )}
                                        <p>${item.price} × {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="text-3xl font-bold text-right mt-8">
                                Total: ${total.toFixed(2)}
                            </div>
                            <button
                                className="bg-green-600 px-8 py-3 rounded-lg mt-6 w-full"
                                onClick={handlePlaceOrder}
                            >
                                Place Order
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default CartSummary;