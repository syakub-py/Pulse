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
	API_KEY: "",
	AUTH_DOMAIN: "",
	PROJECT_ID: "",
	STORAGE_BUCKET: "",
	MESSAGING_SENDER_ID: "",
	APP_ID: "",
	MEASUREMENT_ID: "",
	DEFAULT_PROFILE_PICTURE: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
	BASE_URL:"http://127.0.0.1:8000"
};

export default config;
