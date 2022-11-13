import React from 'react'
import { Box, FlatList, Heading, useColorMode } from 'native-base'

import {
  PodcastMenuItem,
  PodcastMenuItemProps,
} from '../components/PodcastMenuItem'
import { PodcastStackScreenProps } from '../types'

const podcasts: PodcastMenuItemProps[] = [
  {
    title: 'The Daily',
    category: 'News',
    description:
      'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
    image: 'https://wallpaperaccess.com/full/317501.jpg',
    latestEpisodeDateCreated: '2022-11-09 00:00:00',
    latestEpisodeDurationInSeconds: 7200,
  },
  {
    title: 'The Daily',
    category: 'News',
    description:
      'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
    image: 'https://wallpaperaccess.com/full/317501.jpg',
    latestEpisodeDateCreated: '2020-01-01',
    latestEpisodeDurationInSeconds: 300,
  },
  {
    title: 'The Daily',
    category: 'News',
    description:
      'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
    image: 'https://wallpaperaccess.com/full/317501.jpg',
    latestEpisodeDateCreated: '2020-01-01',
    latestEpisodeDurationInSeconds: 120,
  },
  {
    title: 'The Daily',
    category: 'News',
    description:
      'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
    image: 'https://wallpaperaccess.com/full/317501.jpg',
    latestEpisodeDateCreated: '2020-01-01',
    latestEpisodeDurationInSeconds: 120,
  },
  {
    title: 'The Daily',
    category: 'News',
    description:
      'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
    image: 'https://wallpaperaccess.com/full/317501.jpg',
    latestEpisodeDateCreated: '2020-01-01',
    latestEpisodeDurationInSeconds: 120,
  },
  {
    title: 'The Daily',
    category: 'News',
    description:
      'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
    image: 'https://wallpaperaccess.com/full/317501.jpg',
    latestEpisodeDateCreated: '2020-01-01',
    latestEpisodeDurationInSeconds: 120,
  },
  {
    title: 'The Daily',
    category: 'News',
    description:
      'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
    image: 'https://wallpaperaccess.com/full/317501.jpg',
    latestEpisodeDateCreated: '2020-01-01',
    latestEpisodeDurationInSeconds: 120,
  },
  {
    title: 'The Daily',
    category: 'News',
    description:
      'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
    image: 'https://wallpaperaccess.com/full/317501.jpg',
    latestEpisodeDateCreated: '2020-01-01',
    latestEpisodeDurationInSeconds: 120,
  },
]

export default function Podcasts({
  navigation,
}: PodcastStackScreenProps<'Podcasts'>) {
  const { toggleColorMode } = useColorMode()
  return (
    <Box h="100%" paddingX={4} safeAreaTop safeAreaX variant="layout">
      <Heading>Podcasts</Heading>

      <FlatList
        data={podcasts}
        renderItem={({ item, index }) => (
          <PodcastMenuItem
            {...item}
            mb={index === podcasts.length - 1 ? '30%' : 0}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.title.toString()}
      />
    </Box>
  )
}
