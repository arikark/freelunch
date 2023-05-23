/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
  ArrowBackIcon,
  Divider,
  FlatList,
  Heading,
  HStack,
  IconButton,
  Text,
} from 'native-base'
import { z } from 'zod'

import { EpisodeMenuItem } from '../components/EpisodeMenuItem'
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

const episodeZ = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  imageURL: z.string(),
  audioURL: z.string(),
  durationInSeconds: z.number(),
})

export const episodesZ = z.object({
  name: z.string(),
  _id: z.string(),
  episodes: z.array(episodeZ),
})

export default function Episodes({
  navigation,
  route,
}: PodcastStackScreenProps<'Episodes'>) {
  const { podcastId } = route.params

  const query = `*[_type == "podcast" && _id == "${podcastId}"][0]{
    name,
    _id,
    "episodes": *[_type == "episode" && references(^._id, "episode") ]{
      name,
      _id,
      description,
      "imageURL": image.asset->url,
      "audioURL": audio.asset->url,
      durationInSeconds,
    }
  }
`
  const {
    isLoading,
    error,
    data: podcast,
  } = useGetContent<typeof episodesZ>(`podcast ${podcastId}`, episodesZ, query)

  if (error) {
    return <Text>{JSON.stringify(error, null, 2)}</Text>
  }

  if (podcast) {
    return (
      <Layout>
        <HStack alignItems="center">
          <IconButton
            icon={<ArrowBackIcon />}
            onPress={() => navigation.goBack()}
            mr={4}
          />
          <Heading>{podcast?.name}</Heading>
        </HStack>
        <FlatList
          data={podcast.episodes}
          renderItem={({ item, index }) => (
            <EpisodeMenuItem
              {...{ ...item, podcastName: podcast.name }}
              mb={
                podcast?.episodes && index === podcast.episodes.length - 1
                  ? '30%'
                  : 0
              }
              onPress={() =>
                navigation.navigate('Episode', {
                  title: item.name,
                  episodeId: item._id,
                })
              }
            />
          )}
          ItemSeparatorComponent={() => <Divider />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item._id.toString()}
        />
      </Layout>
    )
  }
  return <Text>Loading...</Text>
}
