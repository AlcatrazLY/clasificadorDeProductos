import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

import * as tf from "@tensorflow/tfjs-node";
import sharp from "sharp"; // For image preprocessing
import { Readable } from "stream";

const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

const downloadImageFromS3 = async (bucket, key) => {
	const command = new GetObjectCommand({ Bucket: bucket, Key: key });
	const response = await s3.send(command);
	const stream = response.Body;

	return new Promise((resolve, reject) => {
		const chunks = [];
		stream.on("data", (chunk) => chunks.push(chunk));
		stream.on("error", reject);
		stream.on("end", () => resolve(Buffer.concat(chunks)));
	});
};

const preprocessImage = async (imageBuffer) => {
	const image = await sharp(imageBuffer).resize(224, 224).toBuffer(); // Resize to match model input
	const tensor = tf.node.decodeImage(image, 3).expandDims(0).div(255.0); // Normalize
	return tensor;
};

export default async (req, res) => {
	if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	const { bucket, key, modelPath } = req.body;

	try {
		// Download image from S3
		const imageBuffer = await downloadImageFromS3(bucket, key);

		// Preprocess the image
		const imageTensor = await preprocessImage(imageBuffer);

		// Load TensorFlow model
		const model = await tf.loadLayersModel(`file://${modelPath}`);

		// Classify the image
		const predictions = model.predict(imageTensor).dataSync();

		// Return predictions
		return res.status(200).json({ predictions });
	} catch (error) {
		console.error("Error in processing:", error);
		return res.status(500).json({ error: error.message });
	}
};
