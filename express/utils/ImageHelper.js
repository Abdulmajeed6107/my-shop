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
  if (image.startsWith('/uploads')) return `http://localhost:3000${image}`;
  return `http://localhost:3000/uploads/${image}`;
};