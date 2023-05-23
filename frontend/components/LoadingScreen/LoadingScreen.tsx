import { Center, Spinner } from 'native-base'

import { Layout } from '../Layout'

export function LoadingScreen() {
  return (
    <Layout>
      <Center h="100%" bg="pink">
        <Spinner accessibilityLabel="Loading podcasts" color="blue.500" />
      </Center>
    </Layout>
  )
}
