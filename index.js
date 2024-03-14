import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
export async function uploadImageToS3(options, file) {
    // Check if required options are provided
    if (!options || !options.bucketName || !options.region || !options.credentials || !options.credentials.accessKeyId || !options.credentials.secretAccessKey) {
        throw new Error('Missing required options for uploading image to S3.');
    }

    // Check if file object is provided
    if (!file || !file.originalname || !file.buffer || !file.mimetype) {
        throw new Error('Missing required file object for uploading image to S3.');
    }

    const { bucketName, region, credentials } = options;

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
    });

    const s3Client = new S3Client({
        credentials,
        region
    });

    try {
        const response = await s3Client.send(command);
        console.log("Upload response: ", response);
        return response;
    } catch (error) {
        console.error("Error uploading image to S3: ", error);
        throw new Error('Error uploading image to S3.');
    }
}
