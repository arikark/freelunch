// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

import * as functions from 'firebase-functions'

export const helloWorld = functions
  .region('australia-southeast1')
  .https.onRequest((request, response) => {
    functions.logger.info('Hello logs!', { structuredData: true })
    response.send('Hello from Firebase!')
  })
