import cloudinary from "./cloudinary.js";

export const uploadImg = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "members",
          allowed_formats: ["jpeg", "png"],
        },
        (err, res) => {
          if (err) {
            return reject(err);
          }
          resolve({
            url: res?.secure_url,
            publicId: res?.public_id,
          });
        }
      )
      .end(fileBuffer);
  });
};

export const deleteImg = async (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
};
