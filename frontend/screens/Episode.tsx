import React, { useState } from 'react'
import moment from 'moment'
import {
  Box,
  ChevronLeftIcon,
  ChevronRightIcon,
  Heading,
  HStack,
  IconButton,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import { z } from 'zod'

import { Layout } from '../components/Layout'
import { PlayButton } from '../components/PlayButton'
import { useGetContent } from '../hooks/useGetContent'
import { PodcastStackScreenProps } from '../types'

export const detailedEpisodeZ = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  imageURL: z.string(),
  audioURL: z.string(),
  durationInSeconds: z.number(),
  podcast: z.object({
    name: z.string(),
    _id: z.string(),
  }),
})

export default function Episode({
  navigation,
  route,
}: PodcastStackScreenProps<'Episode'>) {
  const { title, episodeId } = route.params
  const query = `*[_type == 'episode' && _id == '${episodeId}'][0]{
    name,
    _id,
    description,
    "imageURL": image.asset->url,
    "audioURL": audio.asset->url,
    durationInSeconds,
    "podcast": *[_type == 'podcast' && references(^._id)][0]{name, _id}
  }
`
  const {
    isLoading,
    error,
    data: episode,
  } = useGetContent<typeof detailedEpisodeZ>(
    `episode ${episodeId}`,
    detailedEpisodeZ,
    query
  )
  const [isFullDescription, setIsFullDescription] = useState(false)

  const formattedDate = moment(episode?.durationInSeconds).fromNow()
  // Format time as 1 hour and 20 minutes left
  const timeRemaining = episode
    ? moment
        // .duration(episode.durationInSeconds - episode.secondsPlayed, 'seconds')
        .duration(episode.durationInSeconds - 10, 'seconds')
        .humanize()
    : ''

  const isLongDescription = episode ? episode.description.length > 200 : false
  const description =
    isLongDescription && !isFullDescription
      ? `${episode?.description.slice(0, 200)}...`
      : episode?.description

  return (
    <Layout isLoading={isLoading} error={error}>
      <HStack alignItems="center" mb={8}>
        <IconButton
          p={0}
          size="lg"
          accessibilityLabel="Go back"
          icon={<ChevronLeftIcon />}
          onPress={() => navigation.goBack()}
        />
      </HStack>
      {episode && (
        <VStack h="78%" justifyContent="space-between" pb={20}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack justifyContent="space-between">
              <VStack minH="250px" justifyContent="space-between">
                <Box>
                  <Image
                    borderRadius={8}
                    source={{
                      uri: episode.imageURL,
                    }}
                    alt={`${episode.name} image`}
                    size="md"
                  />
                  <Heading color="white">{title}</Heading>
                </Box>
                <Box>
                  <Text fontWeight="bold">{episode.podcast.name}</Text>
                  <Text
                    fontSize={10}
                  >{`${formattedDate} • ${timeRemaining} left`}</Text>
                </Box>
                <Box width="88px" minH="55px" justifyContent="center">
                  <PlayButton
                    variant="button"
                    track={{
                      trackId: episode._id,
                      trackImageURL: episode.imageURL,
                      trackName: episode.name,
                      collectionName: episode.podcast.name,
                      trackURL: episode.audioURL,
                    }}
                  />
                </Box>
              </VStack>
              <Box>
                <Text mb={3}>{description}</Text>
                <Text>
                  {!isLongDescription ? null : (
                    <Pressable
                      onPress={() => setIsFullDescription(!isFullDescription)}
                    >
                      <Text bold color="white">
                        {isFullDescription ? 'Show less' : 'Show more'}
                      </Text>
                    </Pressable>
                  )}
                </Text>
              </Box>
            </VStack>
          </ScrollView>
          <Pressable
            onPress={() =>
              navigation.navigate('Episodes', {
                podcastId: episode.podcast._id,
              })
            }
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginTop={4}
          >
            <Text bold fontSize="lg">
              See all episodes
            </Text>
            <ChevronRightIcon as="go to episodes" />
          </Pressable>
        </VStack>
      )}
    </Layout>
  )
}
