import { initializeApp } from 'firebase/app'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'

import { config } from '../config'

export const firebaseApp = initializeApp(config.firebase)

export const functions = getFunctions(firebaseApp, 'australia-southeast1')

if (__DEV__) {
  connectFunctionsEmulator(functions, 'localhost', 5001)
}
