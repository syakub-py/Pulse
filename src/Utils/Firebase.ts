import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";
import "firebase/compat/storage";
import config from "../../env";

const firebaseConfig = {
	apiKey: config.API_KEY,
	authDomain: config.AUTH_DOMAIN,
	projectId: config.PROJECT_ID,
	storageBucket: config.STORAGE_BUCKET,
	messagingSenderId: config.MESSAGING_SENDER_ID,
	appId: config.APP_ID,
	measurementId: config.MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage();

export { auth, storage };
