import { Box, Text } from 'native-base'

import { RootStackScreenProps } from '../types'

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<'NotFound'>) {
  return (
    <Box>
      <Text>Not Found</Text>
    </Box>
  )
}
