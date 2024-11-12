interface Config {
	API_KEY: string;
	AUTH_DOMAIN: string;
	PROJECT_ID: string;
	STORAGE_BUCKET: string;
	MESSAGING_SENDER_ID: string;
	APP_ID: string;
	MEASUREMENT_ID: string;
	DEFAULT_PROFILE_PICTURE:string;
	BASE_URL: string;
}

const config: Config = {
	API_KEY: "AIzaSyDbtKzqRUe-8lJL9Ki7CCrTOmmGcnX8ks8",
	AUTH_DOMAIN: "pulse-91f49.firebaseapp.com",
	PROJECT_ID: "pulse-91f49",
	STORAGE_BUCKET: "pulse-91f49.firebasestorage.app",
	MESSAGING_SENDER_ID: "877426915878",
	APP_ID: "1:877426915878:web:e4646738cdcf6f6c2844e7",
	MEASUREMENT_ID: "G-QB5DSRQNRZ",
	DEFAULT_PROFILE_PICTURE: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
	BASE_URL:"http://127.0.0.1:8000"
};

export default config;
