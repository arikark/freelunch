import { initializeApp } from 'firebase/app'
// Optionally import the services that you want to use
import { getAuth } from 'firebase/auth'
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCQdmtdi15On5QOlHyaR1I_zwcn1JypIIg',
  authDomain: 'free-lunch-media.firebaseapp.com',
  projectId: 'free-lunch-media',
  storageBucket: 'free-lunch-media.appspot.com',
  messagingSenderId: '406658712723',
  appId: '1:406658712723:web:cc324c11ba8a12f1a63966',
  measurementId: 'G-HJJL41CG7Q',
}

const app = initializeApp(firebaseConfig)
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
const auth = getAuth(app)
