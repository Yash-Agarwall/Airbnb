const { cloudinary } = require("../../cloudConfig.js");

async function saveImage(
    image,
    folder = "general"
) {

    const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB

    if (!image) return null;

    const matches = image.match(
        /^data:(image\/(jpeg|jpg|png|webp));base64,(.+)$/
    );

    if (!matches) {
        throw new Error("Invalid image format");
    }

    const imageData = matches[3];
    const buffer = Buffer.from(imageData, "base64");

    if (buffer.length > MAX_FILE_SIZE) {
        const error = new Error("Image exceeds 3 MB limit");
        error.statusCode = 413;
        throw error;
    }
    const mimeType = matches[1];
    const result = await cloudinary.uploader.upload(image, {
        folder: `wanderlust_DEV/${folder}`,
        resource_type: "image",
    });

    return {
        path: result.secure_url,
        publicId: result.public_id,
        mimeType,
    };
}

module.exports = {
    saveImage,
};