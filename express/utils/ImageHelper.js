// // utils/imageHelper.js
// export const buildImageUrl = (image) => {
//   if (!image) return null;
//   if (image.startsWith('http')) return image;
//   if (image.startsWith('/')) return `http://localhost:3000${image}`;
//   return `http://localhost:3000/${image}`;
// };
// utils/imageHelper.js
export const buildImageUrl = (image) => {
  if (!image) return null;
  if (image.startsWith('http')) return image;
  
  const baseUrl = process.env.BASE_URL
    || (process.env.NODE_ENV === 'production'
      ? 'https://my-shop-q1uu.onrender.com'
      : 'http://localhost:3000');
  
  if (image.startsWith('/uploads')) return `${baseUrl}${image}`;
  return `${baseUrl}/uploads/${image}`;
};