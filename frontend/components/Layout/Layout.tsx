import { ReactNode } from 'react'
import { Box } from 'native-base'

import { LoadingScreen } from '../LoadingScreen'

export function Layout({
  children,
  isLoading,
  error,
}: {
  children: ReactNode
  isLoading?: boolean
  error?: Error | null
}) {
  if (error) {
    return <Box>{JSON.stringify(error, null, 2)} </Box>
  }
  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Box
      h="100%"
      paddingX={4}
      paddingTop={4}
      safeAreaTop
      safeAreaX
      variant="layout"
    >
      {children}
    </Box>
  )
}
