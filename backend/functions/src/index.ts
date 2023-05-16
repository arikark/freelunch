// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

import * as functions from 'firebase-functions'
import { HttpsError } from 'firebase-functions/v1/auth'
// import { sanityClient } from './utils.ts/sanityClient'

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

import { createClient } from '@sanity/client'
import { defineString } from 'firebase-functions/params'

const token = defineString('SANITY_API_TOKEN')
const dataset = defineString('SANITY_DATASET')
const sanityProjectId = defineString('SANITY_PROJECT_ID')

export const getContent = functions
  .region('australia-southeast1')
  .runWith({
    secrets: ['SANITY_API_TOKEN', 'SANITY_PROJECT_ID'],
  })
  .https.onCall(async (query, context) => {
    try {
      const sanityClient = createClient({
        dataset: dataset.value(),
        projectId: sanityProjectId.value(),
        token: token.value(), // Only if you want to update content with the client
        useCdn: true, // set to `false` to bypass the edge cache
        apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
      })
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
