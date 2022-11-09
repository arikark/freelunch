import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
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
    components: {
      Box: {
        baseStyle: (props: any) => {
          return {
            _light: { backgroundColor: 'indigo.900' },
            _dark: { backgroundColor: 'indigo.200' },
          }
        },
      },
      Heading: {
        baseStyle: (props: any) => {
          return {
            _light: { color: 'white' },
            _dark: { color: 'indigo.900' },
          }
        },
      },
      Text: {
        baseStyle: (props: any) => {
          return {
            _light: { color: 'white' },
            _dark: { color: 'indigo.900' },
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
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </NativeBaseProvider>
    )
  }
}
