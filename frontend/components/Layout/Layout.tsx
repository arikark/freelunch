import { Box, IBoxProps } from 'native-base'

export function Layout({ children }: IBoxProps) {
  return (
    <Box h="100%" paddingX={4} safeAreaTop safeAreaX variant="layout">
      {children}
    </Box>
  )
}
