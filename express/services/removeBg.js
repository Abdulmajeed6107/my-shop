import cloudinary from '../config/cloudinary.js';

const DEFAULT_CREAM = 'faf9f6';

function normalizeBgColor(bgColor) {
    let clean = (bgColor || DEFAULT_CREAM).replace('#', '').trim();
    if (['warmcream', 'cream'].includes(clean.toLowerCase())) {
        clean = DEFAULT_CREAM;
    }
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
        clean = DEFAULT_CREAM;
    }
    return clean.toLowerCase();
}

async function uploadStudioImage(buffer) {
    const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
        folder: 'products',
    });
    return uploadResult.secure_url;
}

async function removeBgWithRemoveBgApi(imageUrl, bgColorHex, apiKey) {
    console.log(`✂️ remove.bg studio background (#${bgColorHex})...`);

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_url: imageUrl,
            size: 'auto',
            bg_color: bgColorHex,
        }),
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Remove.bg error (${response.status}): ${errText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    return uploadStudioImage(buffer);
}

/**
 * Server-side studio background (remove.bg only — no local ML; safe for 512MB hosts).
 * Skip entirely when the admin panel already sent a processed image (image_preprocessed=true).
 */
export const removeBgStudioQuality = async (imageUrl, bgColor = DEFAULT_CREAM, options = {}) => {
    if (options.skip) {
        return imageUrl;
    }

    const cleanBgColor = normalizeBgColor(bgColor);
    const apiKey = process.env.REMOVE_BG_API_KEY;

    if (!apiKey) {
        console.log(
            'ℹ️ No REMOVE_BG_API_KEY and image not pre-processed — saving upload as-is. ' +
                'Process photos in the admin panel before upload, or set REMOVE_BG_API_KEY.'
        );
        return imageUrl;
    }

    try {
        const url = await removeBgWithRemoveBgApi(imageUrl, cleanBgColor, apiKey);
        console.log('🎉 remove.bg studio image ready:', url);
        return url;
    } catch (error) {
        console.error('⚠️ remove.bg failed:', error.message);
        return imageUrl;
    }
};

export function isImagePreprocessed(body) {
    const v = body?.image_preprocessed;
    return v === true || v === 'true' || v === '1';
}
