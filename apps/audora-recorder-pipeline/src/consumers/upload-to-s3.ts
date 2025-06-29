import {
  S3Client,
  PutObjectCommand,
  type PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import {
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET_NAME,
} from "../config";

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const uploadToS3 = async (
  key: string,
  body: Buffer,
  contentType = "video/mp4"
): Promise<string> => {
  const bucketName = AWS_S3_BUCKET_NAME;
  const input: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: key,
    Body: body,
    ContentType: contentType,
    ACL: "public-read", // or private, depending on your use case
  };

  const command = new PutObjectCommand(input);
  await s3.send(command);

  return `https://${bucketName}.s3.${AWS_REGION}.amazonaws.com/${key}`;
};

export default uploadToS3;
