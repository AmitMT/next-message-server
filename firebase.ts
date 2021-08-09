import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.FIREBASE_KEY,
	authDomain: process.env.FIREBASE_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();

export { app, db };
