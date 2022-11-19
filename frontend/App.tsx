import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { extendTheme, NativeBaseProvider } from 'native-base'
import * as Sentry from 'sentry-expo'

import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'

export default function App() {
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

  Sentry.init({
    dsn: 'https://fc857a04608c4b63b3a6a0df52ab6ab6@o4504179001262080.ingest.sentry.io/4504179003949056',
    enableInExpoDevelopment: true,
    debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  })

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <Navigation />
        <StatusBar />
      </NativeBaseProvider>
    )
  }
}
