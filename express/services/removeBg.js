import cloudinary from '../config/cloudinary.js';

/**
 * High quality background removal using remove.bg API with customizable background color
 */
export const removeBgStudioQuality = async (imageUrl, bgColor = "f5f5f7") => {
    const apiKey = process.env.REMOVE_BG_API_KEY;

    if (!apiKey) {
        console.log("ℹ️ No REMOVE_BG_API_KEY set in .env. Using original uploaded image.");
        return imageUrl;
    }

    try {
        const formattedBgColor = bgColor ? bgColor.replace("#", "") : "f5f5f7";
        console.log(`✂️ Requesting studio-quality background removal with color #${formattedBgColor}...`);

        const response = await fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: {
                "X-Api-Key": apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image_url: imageUrl,
                size: "auto",
                bg_color: formattedBgColor,
            }),
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Remove.bg error (${response.status}): ${errText}`);
        }

        const buffer = Buffer.from(await response.arrayBuffer());
        const base64Image = `data:image/jpeg;base64,${buffer.toString("base64")}`;

        console.log("☁️ Uploading studio-clean image to Cloudinary...");
        const uploadResult = await cloudinary.uploader.upload(base64Image, {
            folder: "products",
        });

        console.log("🎉 Studio clean image ready:", uploadResult.secure_url);
        return uploadResult.secure_url;
    } catch (error) {
        console.error("⚠️ Background removal fallback:", error.message);
        return imageUrl;
    }
};
