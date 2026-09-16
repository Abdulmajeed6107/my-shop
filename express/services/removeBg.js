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

async function uploadStudioImage(buffer, contentType = 'image/png') {
    const base64Image = `data:${contentType};base64,${buffer.toString('base64')}`;
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
        folder: 'products',
    });
    return uploadResult.secure_url;
}

async function removeBgWithRemoveBgApi(imageUrl, bgColorHex, apiKey) {
    console.log(`✂️ remove.bg studio background (#${bgColorHex})...`);

    const imageRes = await fetch(imageUrl, {
        signal: AbortSignal.timeout(60_000),
    });
    if (!imageRes.ok) {
        throw new Error(`Could not fetch uploaded image (${imageRes.status})`);
    }
    const imageBytes = Buffer.from(await imageRes.arrayBuffer());

    const form = new FormData();
    form.append('image_file', new Blob([imageBytes]), 'product.jpg');
    form.append('size', 'auto');
    form.append('bg_color', bgColorHex);

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey,
        },
        body: form,
        signal: AbortSignal.timeout(120_000),
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Remove.bg error (${response.status}): ${errText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get('content-type')?.split(';')[0] || 'image/png';
    return uploadStudioImage(buffer, contentType);
}

/**
 * Studio background via remove.bg (lightweight — safe on 512MB hosts).
 * When REMOVE_BG_API_KEY is set, always runs on every product upload.
 */
export const removeBgStudioQuality = async (imageUrl, bgColor = DEFAULT_CREAM, options = {}) => {
    const cleanBgColor = normalizeBgColor(bgColor);
    const apiKey = process.env.REMOVE_BG_API_KEY?.trim();
    let processingError;

    if (apiKey) {
        try {
            const url = await removeBgWithRemoveBgApi(imageUrl, cleanBgColor, apiKey);
            console.log('🎉 remove.bg studio image ready:', url);
            return url;
        } catch (error) {
            processingError = error;
            console.error('⚠️ remove.bg failed:', error.message);
            if (options.skip) {
                console.log('Using admin pre-processed upload after remove.bg failure.');
                return imageUrl;
            }
        }
    }

    if (options.skip) {
        return imageUrl;
    }

    throw processingError || new Error(
        'Background removal is unavailable. Set REMOVE_BG_API_KEY on the API server and try again.'
    );
};

export function isImagePreprocessed(body) {
    const v = body?.image_preprocessed;
    return v === true || v === 'true' || v === '1';
}
