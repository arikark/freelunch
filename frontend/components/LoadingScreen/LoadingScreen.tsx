import { Center, Spinner } from 'native-base'

export function LoadingScreen() {
  return (
    <Center h="100%" bg="pink">
      <Spinner accessibilityLabel="Loading podcasts" color="blue.500" />
    </Center>
  )
}
