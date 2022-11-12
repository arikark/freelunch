import React from 'react'
import { Box, Heading } from 'native-base'

import { RootTabScreenProps } from '../types'

export default function Profile({
  navigation,
}: RootTabScreenProps<'ProfileTab'>) {
  return (
    <Box h="100%" paddingX={4} safeArea>
      <Heading>My Profile</Heading>
    </Box>
  )
}
