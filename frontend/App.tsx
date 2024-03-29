import React from 'react'
import { QueryClientProvider } from 'react-query'
import { ErrorBoundary } from '@sentry/react-native'
import { StatusBar } from 'expo-status-bar'
import { extendTheme, NativeBaseProvider } from 'native-base'
import * as Sentry from 'sentry-expo'

// import 'dotenv/config'
import { onAppStateChange, queryClient } from './api/reactquery'
import { config } from './config'
import { useAppState } from './hooks/useAppState'
import useCachedResources from './hooks/useCachedResources'
import { useOnlineManager } from './hooks/useOnlineManager'
import Navigation from './navigation'

if (__DEV__) {
  // @ts-ignore
  import('./api/reactotron')
}

Sentry.init({
  dsn: config.sentry.dsn,
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
})

export default function App() {
  useOnlineManager()
  useAppState(onAppStateChange)

  const theme = extendTheme({
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
    fonts: {
      heading: 'roboto-mono',
      body: 'roboto-mono',
      mono: 'roboto-mono',
    },
    components: {
      Box: {
        variants: {
          // Adding new variant
          layout: () => {
            return {
              _light: { backgroundColor: 'indigo.200' },
              _dark: { backgroundColor: 'indigo.900' },
            }
          },
        },
      },
      Heading: {
        baseStyle: (props: any) => {
          return {
            _light: { color: 'indigo.900' },
            _dark: { color: 'white' },
          }
        },
      },
      Text: {
        baseStyle: (props: any) => {
          return {
            _light: { color: 'indigo.900' },
            _dark: { color: 'white' },
          }
        },
      },
    },
  })
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <ErrorBoundary>
        <NativeBaseProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Navigation />
            <StatusBar />
          </QueryClientProvider>
        </NativeBaseProvider>
      </ErrorBoundary>
    )
  }
}
