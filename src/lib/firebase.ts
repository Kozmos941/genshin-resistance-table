// https://stackoverflow.com/questions/69124857/how-to-hide-api-keys-when-using-react-firebase-and-github-action-deploy

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getDatabase, ref, child, get } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWQ8Ybzl6p8sz_qVuzMPENzQA4lgaT7iM",
  authDomain: "genshin-resistance-table.firebaseapp.com",
  projectId: "genshin-resistance-table",
  storageBucket: "genshin-resistance-table.appspot.com",
  messagingSenderId: "829850714023",
  appId: "1:829850714023:web:07549c259fcf3f7cc44082",
  measurementId: "G-ML9XL1G2MC",
  databaseURL: "https://genshin-resistance-table-default-rtdb.asia-southeast1.firebasedatabase.app",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
// logEvent(analytics, 'notification_received');

// Initialize Realtime Database and get a reference to the service
const dbRef = ref(getDatabase(app));

export function GET() {
  get(child(dbRef, `test`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}
