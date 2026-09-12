import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';
import path from 'path';
import os from 'os';
import cloudinary from '../config/cloudinary.js';

export const removeBackgroundAndUpload = async (imageUrl) => {
    const tempDir = os.tmpdir();
    const timestamp = Date.now();
    const inputPath = path.join(tempDir, `product-input-${timestamp}.jpg`);
    const outputPath = path.join(tempDir, `product-clean-${timestamp}.png`);

    try {
        console.log("📥 Fetching image for background removal:", imageUrl);
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        const imageBuffer = Buffer.from(await response.arrayBuffer());
        fs.writeFileSync(inputPath, imageBuffer);

        console.log("✂️ Starting AI background removal...");
        const blob = await removeBackground(inputPath);
        console.log("✅ Background removed successfully!");

        const processedBuffer = Buffer.from(await blob.arrayBuffer());
        fs.writeFileSync(outputPath, processedBuffer);

        console.log("☁️ Uploading cleaned transparent image to Cloudinary...");
        const uploadResult = await cloudinary.uploader.upload(outputPath, {
            folder: "products"
        });

        console.log("🎉 Cleaned image uploaded:", uploadResult.secure_url);
        return uploadResult.secure_url;
    } catch (error) {
        console.error("⚠️ Background removal failed, using original image:", error.message);
        return imageUrl;
    } finally {
        try {
            if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
            if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
        } catch (cleanupErr) {
            console.error("Cleanup error:", cleanupErr.message);
        }
    }
};
