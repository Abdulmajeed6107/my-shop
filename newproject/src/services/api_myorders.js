const API_URL = import.meta.env.VITE_API_URL;

export const fetchMyOrders = async () => {
    const token = localStorage.getItem('token');

    const res = await fetch(`${API_URL}/api/orders/my-orders`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch orders");
    }

    return res.json();
};