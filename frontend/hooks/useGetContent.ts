import { useQuery } from 'react-query'
import { httpsCallable } from 'firebase/functions'
import { z, ZodError, ZodType } from 'zod'

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
        console.log(result)
        return zodType.parse(result.data)
      })
      .catch((error) => {
        if (error instanceof ZodError) {
          throw error
        }
        throw new Error(error.message)
      })

  type InferredType = z.infer<T>

  return useQuery<InferredType, Error>([cacheName, groqQuery], getter)
}
