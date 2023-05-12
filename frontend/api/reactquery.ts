import { AppStateStatus, Platform } from 'react-native'
import { focusManager, QueryClient } from 'react-query'

export function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, suspense: true },
  },
})
