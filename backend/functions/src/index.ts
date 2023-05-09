// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

import * as functions from 'firebase-functions'
import { HttpsError } from 'firebase-functions/v1/auth'
import { sanityClient } from './utils.ts/sanityClient'

export const getPodcasts = functions
  .region('australia-southeast1')
  .https.onCall(async (data, context) => {
    try {
      functions.logger.info('Hello logs!', { structuredData: true })

      const podcasts = await sanityClient.fetch('*[_type == "pet"]')

      return podcasts
    } catch (error) {
      functions.logger.error(error)
      if (error instanceof HttpsError) {
        throw new functions.https.HttpsError('unknown', error.message, error)
      }
    }
  })
