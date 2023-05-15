import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  SENTRY_DSN,
} from '@env'
import { z } from 'zod'

// Ensure that all environment variables are defined
const configZ = z.object({
  firebase: z.object({
    apiKey: z.string(),
    authDomain: z.string(),
    projectId: z.string(),
    storageBucket: z.string(),
    messagingSenderId: z.string(),
    appId: z.string(),
    measurementId: z.string(),
  }),
  sentry: z.object({
    dsn: z.string(),
  }),
})

export const config: z.infer<typeof configZ> = {
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY || FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID || FIREBASE_PROJECT_ID,
    storageBucket:
      process.env.FIREBASE_STORAGE_BUCKET || FIREBASE_STORAGE_BUCKET,
    messagingSenderId:
      process.env.FIREBASE_MESSAGING_SENDER_ID || FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID || FIREBASE_APP_ID,
    measurementId:
      process.env.FIREBASE_MEASUREMENT_ID || FIREBASE_MEASUREMENT_ID,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN || SENTRY_DSN,
  },
}

configZ.parse(config)
