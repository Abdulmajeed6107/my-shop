import { removeBackground } from '@imgly/background-removal';

function loadImageFromBlob(blob) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load processed image'));
    };
    img.src = url;
  });
}

function normalizeHex(bgColor) {
  const clean = (bgColor || 'faf9f6').replace('#', '').trim();
  return /^[0-9a-fA-F]{6}$/.test(clean) ? clean : 'faf9f6';
}

/**
 * Remove background in the browser and flatten onto a solid studio color.
 * Runs on your machine — keeps the API server under memory limits.
 */
export async function applyStudioBackground(file, bgColorHex, onProgress) {
  if (!file) {
    throw new Error('No image file selected');
  }

  const hex = normalizeHex(bgColorHex);

  const transparentBlob = await removeBackground(file, {
    progress: (key, current, total) => {
      if (onProgress && total > 0) {
        onProgress(Math.round((current / total) * 100), key);
      }
    },
  });

  const cutout = await loadImageFromBlob(transparentBlob);

  const canvas = document.createElement('canvas');
  canvas.width = cutout.width;
  canvas.height = cutout.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not prepare canvas');
  }

  ctx.fillStyle = `#${hex}`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(cutout, 0, 0);

  const jpegBlob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Failed to export JPEG'))),
      'image/jpeg',
      0.92
    );
  });

  const baseName = file.name.replace(/\.[^.]+$/, '') || 'product';
  return new File([jpegBlob], `${baseName}-studio.jpg`, { type: 'image/jpeg' });
}
