export const buildImageUrl = (image) => {
  if (!image) return null;
  if (image.startsWith('http')) return image;

  const baseUrl = import.meta.env.VITE_API_URL;

  if (image.startsWith('/uploads')) return `${baseUrl}${image}`;
  return `${baseUrl}/uploads/${image}`;
};