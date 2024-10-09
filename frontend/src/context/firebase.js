import { getAuth, GoogleAuthProvider,  } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBoxJIurbVK0MBQKCyK1dHfPQ2TIs4EwZQ",
  authDomain: "twitter-clone-6b40d.firebaseapp.com",
  projectId: "twitter-clone-6b40d",
  storageBucket: "twitter-clone-6b40d.appspot.com",
  messagingSenderId: "1060540655128",
  appId: "1:1060540655128:web:3874ee78806e1c1f23056d",
  measurementId: "G-J38J55JWD6",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
export const googleProvider = new GoogleAuthProvider();
