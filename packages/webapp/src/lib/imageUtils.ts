import { ImageFile } from "@/components/ui/image-uploader";
import config from "@/config";
import { deleteFileInS3, uploadFileToS3 } from "./aws";

export const uploadFile = async (file: ImageFile) => {
  return await uploadFileToS3(file.file!, config.s3.BUCKET, file.file?.path!);
};

export const deleteFile = async (filePath: string) => {
  return await deleteFileInS3(config.s3.BUCKET, filePath);
};

export const uploadProductImages = async (
  existingImageUrls: string[],
  newImageFiles: ImageFile[]
) => {
  // urls to keep
  const updatedImageUrls = newImageFiles
    .map((image) => image.preview)
    .filter((image) => !image.startsWith("blob:"));

  const imageUrlsToDelete = existingImageUrls?.filter(
    (url) => !updatedImageUrls.includes(url)
  );

  if (imageUrlsToDelete && imageUrlsToDelete.length > 0) {
    await Promise.all(
      imageUrlsToDelete.map((filePath) => deleteFile(filePath))
    );
  }

  // get new images being added
  const newImages = newImageFiles.filter((image) => !!image.file);

  const newImageUrls = await Promise.all(
    newImages.map((image) => uploadFile(image))
  );

  const urls = [...updatedImageUrls, ...newImageUrls];

  // return new images
  return urls;
};
