import React from 'react'
import { SectionListProps } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  Heading,
  HStack,
  Image,
  Pressable,
  SectionList,
  useColorMode,
  VStack,
} from 'native-base'
import { z } from 'zod'

import { Layout } from '../components/Layout'
import {
  PodcastMenuItem,
  PodcastMenuItemProps,
} from '../components/PodcastMenuItem'
import { useGetContent } from '../hooks/useGetContent'
import { PodcastStackScreenProps } from '../types'

const podcasts: SectionListProps<PodcastMenuItemProps> = {
  sections: [
    {
      data: [
        {
          title: 'The Daily1',
          category: 'News',
          description:
            'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
          image: 'https://wallpaperaccess.com/full/317501.jpg',
          latestEpisodeDateCreated: '2022-11-09 00:00:00',
          latestEpisodeDurationInSeconds: 7200,
        },
        {
          title: 'The Daily2',
          category: 'News',
          description:
            'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
          image: 'https://wallpaperaccess.com/full/317501.jpg',
          latestEpisodeDateCreated: '2020-01-01',
          latestEpisodeDurationInSeconds: 300,
        },
        {
          title: 'The Daily3',
          category: 'News',
          description:
            'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
          image: 'https://wallpaperaccess.com/full/317501.jpg',
          latestEpisodeDateCreated: '2020-01-01',
          latestEpisodeDurationInSeconds: 120,
        },
        {
          title: 'The Daily4',
          category: 'News',
          description:
            'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
          image: 'https://wallpaperaccess.com/full/317501.jpg',
          latestEpisodeDateCreated: '2020-01-01',
          latestEpisodeDurationInSeconds: 120,
        },
        {
          title: 'The Daily5',
          category: 'News',
          description:
            'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
          image: 'https://wallpaperaccess.com/full/317501.jpg',
          latestEpisodeDateCreated: '2020-01-01',
          latestEpisodeDurationInSeconds: 120,
        },
        {
          title: 'The Daily6',
          category: 'News',
          description:
            'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
          image: 'https://wallpaperaccess.com/full/317501.jpg',
          latestEpisodeDateCreated: '2020-01-01',
          latestEpisodeDurationInSeconds: 120,
        },
        {
          title: 'The Daily7',
          category: 'News',
          description:
            'The Daily is produced by The New York Times and hosted by Michael Barbaro. Each weekday, we choose one big story and one other story we think you’ll want to hear, and put them together in a single daily podcast. The Daily is an independent production, working closely with Times journalists.',
          image: 'https://wallpaperaccess.com/full/317501.jpg',
          latestEpisodeDateCreated: '2020-01-01',
          latestEpisodeDurationInSeconds: 120,
        },
        {
          title: 'The Daily8',
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

const podcastZ = z.object({
  name: z.string(),
  url: z.string(),
})

const PodcastsZ = z.array(podcastZ)
const query = `*[_type == "podcast"]{
  name,
  url
}
`

function PodcastGallery() {
  const { navigate } = useNavigation()
  const { isLoading, error, data, refetch } = useGetContent<typeof PodcastsZ>(
    'podcasts',
    PodcastsZ,
    query
  )
  return (
    <VStack alignItems="center">
      <HStack justifyContent="space-between">
        {podcasts.sections[0].data.map((value) => (
          <Pressable
            key={value.title}
            onPress={() => navigate('Episodes', { title: value.title })}
          >
            {({ isHovered, isFocused, isPressed }) => (
              <Image
                accessibilityLabel={`Go to ${value.title}`}
                marginTop={2}
                borderRadius={8}
                source={{
                  uri: value.image,
                }}
                alt="Alternate Text"
                size="md"
                margin={1}
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
      </HStack>
      <HStack justifyContent="space-between">
        {podcasts.sections[0].data.map((value) => (
          <Pressable
            key={value.title}
            onPress={() => navigate('Episodes', { title: value.title })}
          >
            {({ isHovered, isFocused, isPressed }) => (
              <Image
                accessibilityLabel={`Go to ${value.title}`}
                marginTop={2}
                borderRadius={8}
                source={{
                  uri: value.image,
                }}
                alt="Alternate Text"
                size="md"
                margin={1}
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
      </HStack>
    </VStack>
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
