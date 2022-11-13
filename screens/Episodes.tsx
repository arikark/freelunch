import React from 'react'
import {
  ArrowBackIcon,
  Box,
  FlatList,
  Heading,
  HStack,
  IconButton,
} from 'native-base'

import {
  EpisodeMenuItem,
  EpisodeMenuItemProps,
} from '../components/EpisodeMenuItem'
import { PodcastStackScreenProps } from '../types'

const episodes: EpisodeMenuItemProps[] = [
  {
    title: 'How Democrats Can Win',
    description:
      'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
    image: 'https://wallpaperaccess.com/full/317501.jpg',
    dateCreated: '2020-01-01',
    durationInSeconds: 1200,
  },
  {
    title: 'The One Where Monica Gets a Roommate',
    description:
      'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
    image: 'https://wallpaperaccess.com/full/317501.jpg',
    dateCreated: '2020-01-01',
    durationInSeconds: 1200,
  },
  {
    title: 'How Democrats Can Win',
    description:
      'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
    image: 'https://wallpaperaccess.com/full/317501.jpg',
    dateCreated: '2020-01-01',
    durationInSeconds: 1200,
  },
]

export default function Episodes({
  navigation,
  route,
}: PodcastStackScreenProps<'Episodes'>) {
  const { title } = route.params

  return (
    <Box h="100%" paddingX={4} safeAreaTop safeAreaX variant="layout">
      <HStack alignItems="center">
        <IconButton
          icon={<ArrowBackIcon />}
          onPress={() => navigation.goBack()}
          mr={4}
        />
        <Heading>{title}</Heading>
      </HStack>

      <FlatList
        data={episodes}
        renderItem={({ item, index }) => (
          <EpisodeMenuItem
            {...item}
            mb={index === episodes.length - 1 ? '30%' : 0}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.title.toString()}
      />
    </Box>
  )
}
