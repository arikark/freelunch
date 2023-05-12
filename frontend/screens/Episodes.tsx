import React from 'react'
import { ArrowBackIcon, Heading, HStack, IconButton } from 'native-base'
import { z } from 'zod'

import { Layout } from '../components/Layout'
import { useGetContent } from '../hooks/useGetContent'
import { PodcastStackScreenProps } from '../types'

// const episodes: EpisodeMenuItemProps[] = [
//   {
//     title: 'How Democrats Can Win',
//     description:
//       'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
//     image: 'https://wallpaperaccess.com/full/317501.jpg',
//     dateCreated: '2020-01-01',
//     durationInSeconds: 1200,
//   },
//   {
//     title: 'The One Where Monica Gets a Roommate',
//     description:
//       'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
//     image: 'https://wallpaperaccess.com/full/317501.jpg',
//     dateCreated: '2020-01-01',
//     durationInSeconds: 1200,
//   },
//   {
//     title: 'How Democrats Can Win',
//     description:
//       'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
//     image: 'https://wallpaperaccess.com/full/317501.jpg',
//     dateCreated: '2020-01-01',
//     durationInSeconds: 1200,
//   },
// ]

const query = `*[_type == "episode"]{

}
`
export const episodesZ = z.array(
  z.object({
    name: z.string(),
    description: z.string(),
    imageURL: z.string(),
    episodes: z.array(
      z.object({
        audioURL: z.string(),
        _createdAt: z.string(),
        name: z.string(),
        description: z.string(),
      })
    ),
  })
)

export default function Episodes({
  navigation,
  route,
}: PodcastStackScreenProps<'Episodes'>) {
  const { title, podcastId } = route.params
  const {
    isLoading,
    error,
    data: episodes,
  } = useGetContent<typeof episodesZ>(`episodes ${podcastId}`, episodesZ, query)

  return (
    <Layout>
      <HStack alignItems="center">
        <IconButton
          icon={<ArrowBackIcon />}
          onPress={() => navigation.goBack()}
          mr={4}
        />
        <Heading>{title}</Heading>
      </HStack>
      {/* <FlatList
        data={episodes}
        renderItem={({ item, index }) => (
          <EpisodeMenuItem
            {...item}
            mb={index === episodes.length - 1 ? '30%' : 0}
            onPress={() =>
              navigation.navigate('Episode', {
                title: item.title,
                id: ,
              })
            }
          />
        )}
        ItemSeparatorComponent={() => <Divider />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.title.toString()}
      /> */}
    </Layout>
  )
}
