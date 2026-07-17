

// src/hooks/useCart.js
import { useState } from 'react';
import axios from 'axios';

export const useCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCartItems = async (user_id) => {

        if (!user_id) return;
        setLoading(true);

        try {
            console.log(`📡 Fetching cart for user: ${user_id}`);
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cartitems/${user_id}`);

            console.log("📦 API Response:", res.data);
            console.log("🖼️ First item image value:", res.data.cart?.[0]?.image);

            if (res.data.success) {
                const items = res.data.cart || [];

                setCartItems(items);

                //  Sync badge in TopHeader
                localStorage.setItem("cartItems", JSON.stringify(items));
                window.dispatchEvent(new Event("cartUpdated"));
            }
        } catch (error) {
            console.error(" Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    return { cartItems, loading, fetchCartItems };
};


