import config from "@/config";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
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
    return {
      success: true,
      url: `https://${config.s3.BUCKET_DOMAIN}/${key}`,
      key,
    };
  } catch (error) {
    console.error("Error uploading file", error);
    return { success: false, error, key, url: file.path };
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
    return { success: true, key };
  } catch (error) {
    console.error("Error deleting file", error);
    return { success: false, error, key, url: path };
  }
};

export const deleteDirectoryInS3 = async (
  bucketName: string,
  directory: string
) => {
  try {
    let continuationToken: string | undefined;

    do {
      // List objects in the "directory"
      const listParams = {
        Bucket: bucketName,
        Prefix: `${directory}/`,
        ContinuationToken: continuationToken,
      };

      const listResponse = await s3.send(new ListObjectsV2Command(listParams));

      if (listResponse.Contents && listResponse.Contents.length > 0) {
        // Delete objects in batches of 1000 (S3 limit)
        const deleteParams = {
          Bucket: bucketName,
          Delete: {
            Objects: listResponse.Contents.map(({ Key }) => ({ Key })),
          },
        };

        await s3.send(new DeleteObjectsCommand(deleteParams));
      }

      continuationToken = listResponse.NextContinuationToken;
    } while (continuationToken);

    // Optionally, delete the "directory" object itself if it exists
    const dirParams = {
      Bucket: bucketName,
      Key: `${directory}/`,
    };
    await s3.send(new DeleteObjectCommand(dirParams));

    return { success: true, directory };
  } catch (error) {
    console.error("Error deleting directory", error);
    return { success: false, error, directory };
  }
};
