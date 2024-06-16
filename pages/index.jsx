import Head from "next/head";
import UploadImg from "../components/UploadImg";
import UploadAndClassify from "../components/UploadAndClassify"; // Correct import
import { useState } from "react";

export default function Home() {
	const [value, setValue] = useState({ logo: "" });

	const handleUpload = (fieldName, url) => {
		setValue((prevValue) => ({ ...prevValue, logo: url })); // Set the logo URL in the form
	};

	return (
		<>
			<Head>
				<title>Home - ImgUpload</title>
			</Head>
			<section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 py-12">
				<div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:max-w-2xl">
					<div className="md:flex">
						<div className="w-full p-8">
							<h2 className="text-3xl font-bold text-center text-gray-800">Upload Your Image</h2>
							<p className="text-center text-gray-600 mb-4">Select an image to upload it to our cloud storage.</p>
							<UploadImg onUpload={handleUpload} fieldName="logo" label="Upload Img" />
							<UploadAndClassify />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
