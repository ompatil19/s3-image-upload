# S3 Image Upload

S3 Image Upload is an npm package that simplifies the process of uploading images to Amazon S3 buckets. It provides a straightforward interface for integrating image uploads into your Node.js applications, abstracting away the complexities of interacting with the AWS SDK.

## Installation

You can install the package via npm:

```bash
npm install s3-image-upload
```
## Parameters:

### options:  
An object containing the configuration options for S3 bucket access.

**bucketName:** The name of your S3 bucket.
region: The AWS region where your bucket is located.

**credentials:** AWS credentials object with accessKeyId and secretAccessKey.

**file:** The uploaded file object, typically obtained through Multer middleware.

### Initializing the Options Object:

```javascript
const options = {
    bucketName: 'your-bucket-name',
    region: 'your-region',
    credentials: {
        accessKeyId: 'your-access-key-id',
        secretAccessKey: 'your-secret-access-key'
    }
};
```

## Implementing the Upload Function:

``` javascript
const response = await uploadImageToS3(options, req.file);

```

## Additional Information

- This package uses the AWS SDK for JavaScript to interact with Amazon S3. Make sure to configure your AWS credentials properly.
- Ensure that your S3 bucket has the necessary permissions for uploading objects.

## Usage Example

```javascript 
// Using multer to convert an image into an image buffer using temporary storage.

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post('/images/upload', upload.single('image'), async (req, res) => {
    try {
        const options = {
            bucketName: 'your-bucket-name',
            region: 'your-region',
            credentials: {
                accessKeyId: 'your-access-key-id',
                secretAccessKey: 'your-secret-access-key'
            }
        };

        const response = await uploadImageToS3(options, req.file);
        console.log("Image uploaded successfully:", response);
        res.send('Image uploaded successfully');
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).send('Internal Server Error');
    }
});
```

## Author
Om Patil <ompatil2002@gmail.com>