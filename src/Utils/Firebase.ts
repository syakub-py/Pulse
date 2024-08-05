import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";
import "firebase/compat/storage";
import {envVariables} from "../../env";

const firebaseConfig = {
	apiKey: envVariables.API_KEY,
	authDomain: envVariables.AUTH_DOMAIN,
	projectId: envVariables.PROJECT_ID,
	storageBucket: envVariables.STORAGE_BUCKET,
	messagingSenderId: envVariables.MESSAGING_SENDER_ID,
	appId: envVariables.APP_ID,
	measurementId: envVariables.MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, firestore, storage };
