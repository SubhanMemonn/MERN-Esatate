import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const uploadResults = [];

        if (typeof localFilePath === "string") {
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "image"
            })
            return response
        } else {
            for (let i = 0; i < localFilePath.length; i++) {
                const photoPath = await cloudinary.uploader.upload(localFilePath[i]);

                uploadResults.push(photoPath.url)
            }
            // console.log("me");

            return uploadResults
        }

    } catch (error) {
        return null
    }
}

export const deleteOnCloudinary = async (localFilePath) => {
    if (typeof localFilePath === "string") {
        return await cloudinary.uploader.destroy(localFilePath)

    } else {
        for (let i = 0; i < localFilePath.length; i++) {
            const element = localFilePath[i].split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(element)
        }
    }
}
