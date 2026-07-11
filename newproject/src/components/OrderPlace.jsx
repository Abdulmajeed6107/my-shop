export const placeOrder = async (cartItems, total, payment) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = user?.id;

    console.log("cartItems with colors:", cartItems.map(i => ({
        name: i.name,
        color_id: i.color_id,
        color_name: i.color_name
    })));

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/place-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id,
            cartItems: cartItems.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price,
                color_id: item.color_id || null  // 👈 send color per item
            })),
            total,
            payment
        })
    });

    const text = await response.text();
    console.log('Raw backend response:', text);

    if (!text) {
        console.error('Backend returned empty response');
        return;
    }

    const result = JSON.parse(text);

    if (result.success) {
        alert(`Order placed successfully! Order ID: ${result.orderId}`);
    }

    return result;
};