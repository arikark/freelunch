// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

import * as functions from 'firebase-functions'
import { HttpsError } from 'firebase-functions/v1/auth'
import { sanityClient } from './utils.ts/sanityClient'

// jsdoc
/**
 * @param {string} query - Sanity query
 * @param {object} context - Firebase context
 * @returns {object} - Sanity query result
 * @throws {HttpsError} - Firebase HttpsError
 * @throws {Error} - Error
 * @example
 * // returns { _id: 'home', _type: 'home', title: 'Home' }
 * getContent(`*[_type == 'home'][0]`)
 * @example
 * // returns { _id: 'home', _type: 'home', title: 'Home' }
 **/

export const getContent = functions
  .region('australia-southeast1')
  .https.onCall(async (query, context) => {
    try {
      // functions.logger.info(query, { structuredData: true })
      const result = await sanityClient.fetch(query)
      return result
    } catch (error) {
      functions.logger.error(error)
      if (error instanceof HttpsError) {
        throw new functions.https.HttpsError('unknown', error.message, error)
      }
      return error
    }
  })
