import cloudinary from '../config/cloudinary.js';

/**
 * Studio-quality background removal with Warm Cream background (#faf9f6)
 */
export const removeBgStudioQuality = async (imageUrl, bgColor = "faf9f6") => {
    const apiKey = process.env.REMOVE_BG_API_KEY;

    if (!apiKey) {
        console.log("ℹ️ No REMOVE_BG_API_KEY set in .env. Using original uploaded image.");
        return imageUrl;
    }

    try {
        let cleanBgColor = bgColor ? bgColor.replace("#", "") : "faf9f6";
        if (cleanBgColor.toLowerCase() === "warmcream" || cleanBgColor.toLowerCase() === "cream") {
            cleanBgColor = "faf9f6";
        }

        console.log(`✂️ Requesting studio background removal with Warm Cream background (#${cleanBgColor})...`);

        const response = await fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: {
                "X-Api-Key": apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image_url: imageUrl,
                size: "auto",
                bg_color: cleanBgColor,
            }),
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Remove.bg error (${response.status}): ${errText}`);
        }

        const buffer = Buffer.from(await response.arrayBuffer());
        const base64Image = `data:image/jpeg;base64,${buffer.toString("base64")}`;

        console.log("☁️ Uploading studio Warm Cream photo to Cloudinary...");
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
