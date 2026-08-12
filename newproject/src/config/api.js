const PRODUCTION_API_URL = "https://my-shop-q1uu.onrender.com";
const LOCAL_API_URL = "http://localhost:3000";

export const API_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? LOCAL_API_URL : PRODUCTION_API_URL)
).replace(/\/$/, "");

export const buildImageUrl = (image) => {
  if (!image) return "/images/Logo.png";
  if (image.startsWith("http")) return image;
  if (image.startsWith("/uploads")) return `${API_URL}${image}`;
  return `${API_URL}/uploads/${image}`;
};
