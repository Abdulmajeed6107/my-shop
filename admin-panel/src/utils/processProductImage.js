const IMGly_VERSION = '1.7.0';
const PUBLIC_PATH = `https://staticimgly.com/@imgly/background-removal-data/${IMGly_VERSION}/dist/`;

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
  const clean = (bgColor || 'ffffff').replace('#', '').trim();
  return /^[0-9a-fA-F]{6}$/.test(clean) ? clean : 'ffffff';
}

async function resizeForProcessing(file, maxSide = 1400) {
  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;

  if (width <= maxSide && height <= maxSide) {
    bitmap.close();
    return file;
  }

  const scale = maxSide / Math.max(width, height);
  const w = Math.round(width * scale);
  const h = Math.round(height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    bitmap.close();
    throw new Error('Could not resize image');
  }
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Resize failed'))),
      'image/jpeg',
      0.92
    );
  });

  const baseName = file.name.replace(/\.[^.]+$/, '') || 'product';
  return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' });
}

/** True if the PNG cutout has enough transparent pixels (background was actually removed). */
async function cutoutHasTransparency(pngBlob) {
  const img = await loadImageFromBlob(pngBlob);
  const sampleW = Math.min(img.width, 240);
  const sampleH = Math.min(img.height, 240);

  const canvas = document.createElement('canvas');
  canvas.width = sampleW;
  canvas.height = sampleH;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return false;

  ctx.drawImage(img, 0, 0, sampleW, sampleH);
  const { data } = ctx.getImageData(0, 0, sampleW, sampleH);

  let transparent = 0;
  const total = sampleW * sampleH;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 240) transparent++;
  }

  return transparent / total > 0.015;
}

/**
 * Remove background in the browser and flatten onto a solid studio color.
 */
export async function applyStudioBackground(file, bgColorHex, onProgress) {
  if (!file) {
    throw new Error('No image file selected');
  }

  const hex = normalizeHex(bgColorHex);
  const inputFile = await resizeForProcessing(file);

  const { default: removeBackground } = await import('@imgly/background-removal');

  const transparentBlob = await removeBackground(inputFile, {
    publicPath: PUBLIC_PATH,
    device: 'cpu',
    model: 'isnet_quint8',
    output: {
      format: 'image/png',
      type: 'foreground',
    },
    progress: (key, current, total) => {
      if (onProgress && total > 0) {
        onProgress(Math.round((current / total) * 100), key);
      }
    },
  });

  const hasAlpha = await cutoutHasTransparency(transparentBlob);
  if (!hasAlpha) {
    throw new Error(
      'Background removal did not run correctly in this browser. ' +
        'Add REMOVE_BG_API_KEY on your API server, or open the admin panel in Chrome on desktop and try again.'
    );
  }

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

  if (onProgress) onProgress(100, 'done');

  const baseName = file.name.replace(/\.[^.]+$/, '') || 'product';
  return new File([jpegBlob], `${baseName}-studio.jpg`, { type: 'image/jpeg' });
}
