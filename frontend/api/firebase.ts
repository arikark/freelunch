import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import {
  connectDatabaseEmulator,
  getDatabase,
  ref,
  set,
} from 'firebase/database'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'

import { config } from '../config'

export const firebaseApp = initializeApp(config.firebase)

export const functions = getFunctions(firebaseApp, 'australia-southeast1')

export const database = getDatabase(firebaseApp)

export const auth = getAuth(firebaseApp)

if (__DEV__) {
  connectFunctionsEmulator(functions, 'localhost', 6001)
  connectDatabaseEmulator(database, 'localhost', 8001)
  connectAuthEmulator(auth, 'http://localhost:5001', { disableWarnings: true })
}

export function writeUserData({
  userId,
  episodeId,
  positionMillis,
}: {
  userId: string
  episodeId: string
  positionMillis: number
}) {
  set(ref(database, `playback/${userId}`), {
    userId,
    episodeId,
    positionMillis,
  })
}
