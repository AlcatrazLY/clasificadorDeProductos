import React, { useState } from "react";
import axios from "axios";

const UploadAndClassify = () => {
	const [file, setFile] = useState(null);
	const [predictions, setPredictions] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleUploadAndClassify = async () => {
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);

		setLoading(true);
		setError(null);

		try {
			const uploadResponse = await axios.post("/api/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			const { url } = uploadResponse.data;

			const response = await fetch(url);
			const blob = await response.blob();
			const image = await createImageBitmap(blob);

			if (typeof tf === "undefined") {
				throw new Error("TensorFlow.js not loaded");
			}

			const model = await tf.loadGraphModel("/model.json");

			const tensor = tf.browser.fromPixels(image).resizeNearestNeighbor([224, 224]).toFloat().expandDims(0);

			const predictions = model.predict(tensor);
			const data = await predictions.data();

			setPredictions(data);
		} catch (err) {
			console.error("Error during classification:", err);
			setError("Failed to classify the image.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="upload-classify-container">
			<input type="file" onChange={handleFileChange} />
			<button onClick={handleUploadAndClassify} disabled={loading}>
				{loading ? "Processing..." : "Upload and Classify"}
			</button>

			{predictions && (
				<div>
					<h3>Predictions:</h3>
					<pre>{JSON.stringify(predictions, null, 2)}</pre>
				</div>
			)}

			{error && <div className="error">{error}</div>}
		</div>
	);
};

export default UploadAndClassify;
