const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "ddzd068io",
  api_key: "634499926553755",
  api_secret: "SB_fSlbItcMWsdNQagWPeQfoGcg",
});

exports.uploadImage = (file) => {
  console.log("files", file?.path);

  const fileBuffer = file.buffer;
  console.log("fileBuffer", fileBuffer);

  //upload  the files to clouding

  return new Promise((res, rej) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          rej(error);
        } else {
          res(result);
        }
      })

      .end(fileBuffer);
  });
};
