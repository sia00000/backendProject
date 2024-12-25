import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const cloudinaryFileUpload = async (filePath) => {
  try {
    if (!filePath) return null;
    //upload file on cloudinary

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // file has been uploaded
    console.log("File has been uploaded on cloudinary", uploadResult.url);
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(filePath); // remove file from locally saved temprory file
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

export { cloudinaryFileUpload };
