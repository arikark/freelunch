import { Heading } from 'native-base'
import { Layout } from '../components/Layout'
import { ProfileStackScreenProps } from '../types'

export default function Profile({
  navigation,
}: ProfileStackScreenProps<'Favourites'>) {
  return (
    <Layout>
      <Heading>Your Favourites</Heading>
    </Layout>
  )
}
