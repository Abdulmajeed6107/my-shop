import cloudinary from '../config/cloudinary.js';
import { removeBackground } from '@imgly/background-removal-node';
import sharp from 'sharp';

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

function hexToRgb(hex) {
    return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
    };
}

async function uploadStudioImage(buffer) {
    const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
        folder: 'products',
    });
    return uploadResult.secure_url;
}

/**
 * Local background removal + flat studio background (no external API).
 */
async function removeBgWithImgly(imageUrl, bgColorHex) {
    console.log(`🎨 Local background removal with studio color #${bgColorHex}...`);

    const transparentBlob = await removeBackground(imageUrl);
    const transparentBuffer = Buffer.from(await transparentBlob.arrayBuffer());

    const meta = await sharp(transparentBuffer).metadata();
    const width = meta.width;
    const height = meta.height;

    if (!width || !height) {
        throw new Error('Could not read image dimensions after background removal');
    }

    const { r, g, b } = hexToRgb(bgColorHex);

    const finalBuffer = await sharp({
        create: {
            width,
            height,
            channels: 3,
            background: { r, g, b },
        },
    })
        .composite([{ input: transparentBuffer }])
        .jpeg({ quality: 92 })
        .toBuffer();

    const url = await uploadStudioImage(finalBuffer);
    console.log('🎉 Local studio image ready:', url);
    return url;
}

/**
 * remove.bg API — studio background with chosen flat color.
 */
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
    const url = await uploadStudioImage(buffer);
    console.log('🎉 remove.bg studio image ready:', url);
    return url;
}

/**
 * Studio-quality background removal with a plain background (default warm cream #faf9f6).
 */
export const removeBgStudioQuality = async (imageUrl, bgColor = DEFAULT_CREAM) => {
    const cleanBgColor = normalizeBgColor(bgColor);
    const apiKey = process.env.REMOVE_BG_API_KEY;

    if (apiKey) {
        try {
            return await removeBgWithRemoveBgApi(imageUrl, cleanBgColor, apiKey);
        } catch (error) {
            console.error('⚠️ remove.bg failed, trying local removal:', error.message);
        }
    } else {
        console.log('ℹ️ No REMOVE_BG_API_KEY — using local background removal.');
    }

    try {
        return await removeBgWithImgly(imageUrl, cleanBgColor);
    } catch (error) {
        console.error('⚠️ Local background removal failed:', error.message);
        return imageUrl;
    }
};
