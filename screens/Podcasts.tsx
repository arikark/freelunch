import { Box, Heading, useColorMode } from 'native-base'

import { RootTabScreenProps } from '../types'

export default function Podcasts({
  navigation,
}: RootTabScreenProps<'Podcasts'>) {
  const { toggleColorMode } = useColorMode()
  return (
    <Box h="100%" paddingX={4} safeArea>
      <Heading>Podcasts</Heading>
    </Box>
  )
}
