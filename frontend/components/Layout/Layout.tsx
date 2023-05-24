import React, { ReactNode, useState } from 'react'
import {
  Alert,
  Box,
  CloseIcon,
  HStack,
  IconButton,
  Slide,
  Text,
  VStack,
} from 'native-base'

import { LoadingScreen } from '../LoadingScreen'

function ErrorAlert({
  onDismiss,
  show,
}: {
  onDismiss: () => void
  show: boolean
}) {
  return (
    <Box w="100%" alignItems="center">
      <Slide in={show} placement="top" duration={300}>
        <Alert maxW="400" status="error">
          <VStack space={1} flexShrink={1} w="100%" pt={6}>
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  _dark={{
                    color: 'coolGray.800',
                  }}
                >
                  Please try again later!
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                _focus={{
                  borderWidth: 0,
                }}
                icon={<CloseIcon size="3" />}
                _icon={{
                  color: 'coolGray.600',
                }}
                onPress={onDismiss}
              />
            </HStack>
            <Box
              pl="6"
              _dark={{
                _text: {
                  color: 'coolGray.600',
                },
              }}
            >
              It looks like we have run into an error.
            </Box>
          </VStack>
        </Alert>
      </Slide>
    </Box>
  )
}

export function Layout({
  children,
  isLoading,
  error,
}: {
  children: ReactNode
  isLoading?: boolean
  error?: Error | null
}) {
  const [show, setShow] = useState(true)
  const onDismiss = () => {
    setShow(false)
  }

  if (error) {
    return (
      <Box
        h="100%"
        paddingX={4}
        paddingTop={4}
        safeAreaTop
        safeAreaX
        variant="layout"
      >
        <ErrorAlert onDismiss={onDismiss} show={show} />
      </Box>
    )
  }
  if (isLoading) {
    return (
      <Box
        h="100%"
        paddingX={4}
        paddingTop={4}
        safeAreaTop
        safeAreaX
        variant="layout"
      >
        <LoadingScreen />
      </Box>
    )
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
