import React from 'react'
import {
  ArrowBackIcon,
  Box,
  Heading,
  HStack,
  IconButton,
  useColorMode,
} from 'native-base'

import { PodcastMenuItemProps } from '../components/PodcastMenuItem'
import { PodcastStackScreenProps } from '../types'

const episodes: PodcastMenuItemProps[] = [
  {
    title: 'The Daily',
    category: 'News',
    description:
      'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
    image: 'https://wallpaperaccess.com/full/317501.jpg',
    dateCreated: '2022-11-09 00:00:00',
    durationInSeconds: 7200,
  },
  {
    title: 'The Daily',
    category: 'News',
    description:
      'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
    image: 'https://wallpaperaccess.com/full/317501.jpg',
    dateCreated: '2020-01-01',
    durationInSeconds: 300,
  },
  {
    title: 'The Daily',
    category: 'News',
    description:
      'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
    image: 'https://wallpaperaccess.com/full/317501.jpg',
    dateCreated: '2020-01-01',
    durationInSeconds: 120,
  },
  {
    title: 'The Daily',
    category: 'News',
    description:
      'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
    image: 'https://wallpaperaccess.com/full/317501.jpg',
    dateCreated: '2020-01-01',
    durationInSeconds: 120,
  },
  {
    title: 'The Daily',
    category: 'News',
    description:
      'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
    image: 'https://wallpaperaccess.com/full/317501.jpg',
    dateCreated: '2020-01-01',
    durationInSeconds: 120,
  },
  {
    title: 'The Daily',
    category: 'News',
    description:
      'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
    image: 'https://wallpaperaccess.com/full/317501.jpg',
    dateCreated: '2020-01-01',
    durationInSeconds: 120,
  },
  {
    title: 'The Daily',
    category: 'News',
    description:
      'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
    image: 'https://wallpaperaccess.com/full/317501.jpg',
    dateCreated: '2020-01-01',
    durationInSeconds: 120,
  },
  {
    title: 'The Daily',
    category: 'News',
    description:
      'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
    image: 'https://wallpaperaccess.com/full/317501.jpg',
    dateCreated: '2020-01-01',
    durationInSeconds: 120,
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

      {/* <FlatList
        data={episodes}
        renderItem={({ item, index }) => (
          <PodcastMenuItem
            {...item}
            mb={index === episodes.length - 1 ? '30%' : 0}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.title.toString()}
      /> */}
    </Box>
  )
}
