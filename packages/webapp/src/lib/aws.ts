import config from "@/config";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { FileWithPath } from "react-dropzone";

const s3 = new S3Client({
  region: config.s3.REGION,
  credentials: {
    accessKeyId: config.aws.ACCESS,
    secretAccessKey: config.aws.SECRET,
  },
});

export const uploadFileToS3 = async (
  file: FileWithPath,
  bucketName: string,
  key: string
) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: file,
    };

    await s3.send(new PutObjectCommand(params));

    return `https://${config.s3.BUCKET_DOMAIN}/${key}`;
  } catch (error) {
    console.error("Error uploading file", error);
  }
};

export const deleteFileInS3 = async (bucketName: string, path: string) => {
  const key = path.split(`https://${config.s3.BUCKET_DOMAIN}/`)[1];

  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };

    await s3.send(new DeleteObjectCommand(params));
  } catch (error) {
    console.error("Error deleting file", error);
  }
};
