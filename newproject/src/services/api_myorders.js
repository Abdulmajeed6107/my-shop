import { API_URL } from "../config/api";

export const fetchMyOrders = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please log in to view your orders.");
  }

  const res = await fetch(`${API_URL}/api/orders/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    throw new Error("Session expired. Please log in again.");
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to load your orders.");
  }

  return res.json();
};
