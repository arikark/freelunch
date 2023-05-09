import { initializeApp } from 'firebase/app'
import { getFunctions, httpsCallable } from 'firebase/functions'

import { PodcastMenuItemProps } from '../components/PodcastMenuItem'

const firebaseConfig = {
  apiKey: 'AIzaSyCQdmtdi15On5QOlHyaR1I_zwcn1JypIIg',
  authDomain: 'free-lunch-media.firebaseapp.com',
  projectId: 'free-lunch-media',
  storageBucket: 'free-lunch-media.appspot.com',
  messagingSenderId: '406658712723',
  appId: '1:406658712723:web:cc324c11ba8a12f1a63966',
  measurementId: 'G-HJJL41CG7Q',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
const functions = getFunctions(app, 'australia-southeast1')

export const getPodcasts = () =>
  httpsCallable<unknown, PodcastMenuItemProps[]>(functions, 'getPodcasts')()
    .then((result) => {
      return result.data
    })
    .catch((error) => {
      return error
    })
