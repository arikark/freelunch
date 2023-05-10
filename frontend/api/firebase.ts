import { initializeApp } from 'firebase/app'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'

export const firebaseConfig = {
  apiKey:
    process.env.FIREBASE_API_KEY ?? 'AIzaSyCQdmtdi15On5QOlHyaR1I_zwcn1JypIIg',
  authDomain:
    process.env.FIREBASE_AUTH_DOMAIN ?? 'free-lunch-media.firebaseapp.com',
  projectId: process.env.FIREBASE_PROJECT_ID ?? 'free-lunch-media',
  storageBucket:
    process.env.FIREBASE_STORAGE_BUCKET ?? 'free-lunch-media.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ?? '406658712723',
  appId:
    process.env.FIREBASE_APP_ID ?? '1:406658712723:web:cc324c11ba8a12f1a63966',
  measurementId: process.env.FIREBASE_MEASUREMENT_ID ?? 'G-HJJL41CG7Q',
}

export const firebaseApp = initializeApp(firebaseConfig)

export const functions = getFunctions(firebaseApp, 'australia-southeast1')

if (__DEV__) {
  connectFunctionsEmulator(functions, 'localhost', 5001)
}
