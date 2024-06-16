import "../styles/global.css"; // Import the global CSS file
import Nav from "../components/Nav"; // Ensure correct import
import Head from "next/head";
export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.0.0/dist/tf.min.js"></script>
			</Head>
			<Nav />
			<Component {...pageProps} />
		</>
	);
}
