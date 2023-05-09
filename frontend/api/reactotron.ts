import Reactotron from 'reactotron-react-native'
import {
  QueryClientManager,
  reactotronReactQuery,
} from 'reactotron-react-query'

import { queryClient } from './reactquery'

const queryClientManager = new QueryClientManager({
  queryClient,
})
Reactotron.use(reactotronReactQuery(queryClientManager))
  .configure({
    onDisconnect: () => {
      queryClientManager.unsubscribe()
    },
  })
  .useReactNative()
  .connect()
