import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxM3qt2bxXKZnma1dzMiwH7KcqSB-norI",
  authDomain: "danentang-db5fa.firebaseapp.com",
  databaseURL: "https://danentang-db5fa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "danentang-db5fa",
  storageBucket: "danentang-db5fa.firebasestorage.app",
  messagingSenderId: "203765434463",
  appId: "1:203765434463:web:e4d42afb6e6099356173ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services you need
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export default app;
