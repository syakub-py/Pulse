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
	API_KEY: "AIzaSyAS0OLIeH01QAyHZQxILWWUu3I2PJm3xz4",
	AUTH_DOMAIN: "nyle-bd594.firebaseapp.com",
	PROJECT_ID: "nyle-bd594",
	STORAGE_BUCKET: "nyle-bd594.appspot.com",
	MESSAGING_SENDER_ID: "616674242131",
	APP_ID: "1:616674242131:web:7788508192e82a84b660a6",
	MEASUREMENT_ID: "G-70E5N2DBMC",
	DEFAULT_PROFILE_PICTURE: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
	BASE_URL:"http://127.0.0.1:8000"
};

export default config;
