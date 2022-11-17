import React from 'react'
import { SectionListProps } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  Box,
  Heading,
  Image,
  Pressable,
  SectionList,
  useColorMode,
} from 'native-base'

import { Layout } from '../components/Layout'
import {
  PodcastMenuItem,
  PodcastMenuItemProps,
} from '../components/PodcastMenuItem'
import { PodcastStackScreenProps } from '../types'

const podcasts: SectionListProps<PodcastMenuItemProps> = {
  sections: [
    {
      data: [
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
      ],
    },
  ],
}

function PodcastGallery() {
  const { navigate } = useNavigation()
  return (
    <Box flexDirection="row" flexWrap="wrap" justifyContent="space-evenly">
      {podcasts.sections[0].data.map((value) => (
        <Pressable onPress={() => navigate('Episodes', { title: value.title })}>
          {({ isHovered, isFocused, isPressed }) => (
            <Image
              accessibilityLabel={`Go to ${value.title}`}
              marginTop={2}
              borderRadius={8}
              source={{
                uri: value.image,
              }}
              alt="Alternate Text"
              size="sm"
              mr={3}
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.86 : 1,
                  },
                ],
              }}
            />
          )}
        </Pressable>
      ))}
    </Box>
  )
}

export default function Podcasts({
  navigation,
}: PodcastStackScreenProps<'Podcasts'>) {
  const { toggleColorMode } = useColorMode()
  return (
    <Layout>
      <Heading>Podcasts</Heading>

      <SectionList
        sections={podcasts.sections}
        ListHeaderComponent={() => <PodcastGallery />}
        data={podcasts}
        renderItem={({ item, index }) => (
          <PodcastMenuItem
            {...item}
            mb={index === podcasts.sections[0].data.length - 1 ? '30%' : 0}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.title.toString()}
      />
    </Layout>
  )
}
