import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { extendTheme, NativeBaseProvider } from 'native-base'

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
