import { useQuery } from 'react-query'
import { httpsCallable } from 'firebase/functions'
import { ZodError, ZodType } from 'zod'

import { functions } from '../api/firebase'

export const useGetContent = <T extends ZodType>(
  cacheName: string,
  zodType: T,
  groqQuery: string
) => {
  const getter = () =>
    httpsCallable<string, T>(
      functions,
      'getContent'
    )(groqQuery)
      // validate the data
      .then((result) => {
        return zodType.parse(result.data)
      })
      .catch((error) => {
        if (error instanceof ZodError) {
          throw error
        }
        throw new Error(error.message)
      })

  return useQuery<T, Error>([cacheName, groqQuery], getter)
}
