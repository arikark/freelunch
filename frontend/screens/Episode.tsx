import React, { useState } from 'react'
import moment from 'moment'
import {
  ArrowBackIcon,
  Box,
  Button,
  ChevronRightIcon,
  Heading,
  HStack,
  IconButton,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base'
import { z } from 'zod'

import { Layout } from '../components/Layout'
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

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (episode) {
    const formattedDate = moment(episode?.durationInSeconds).fromNow()
    // Format time as 1 hour and 20 minutes left
    const timeRemaining = moment
      // .duration(episode.durationInSeconds - episode.secondsPlayed, 'seconds')
      .duration(episode.durationInSeconds - 10, 'seconds')
      .humanize()

    const isLongDescription = episode.description.length > 200
    const description =
      isLongDescription && !isFullDescription
        ? `${episode.description.slice(0, 200)}...`
        : episode.description

    return (
      <Layout>
        <HStack alignItems="center">
          <IconButton
            icon={<ArrowBackIcon />}
            onPress={() => navigation.goBack()}
            mr={4}
          />
        </HStack>
        <VStack minH="50%" justifyContent="space-between">
          <Box minH="17%" justifyContent="space-between">
            <Image
              borderRadius={8}
              source={{
                uri: episode.imageURL,
              }}
              alt="Alternate Text"
              size="sm"
              mr="12px"
            />
            <Heading color="white">{title}</Heading>
          </Box>
          <Box>
            <Text fontWeight="bold">{episode.podcast.name}</Text>
            <Text
              fontSize={10}
            >{`${formattedDate} • ${timeRemaining} left`}</Text>
          </Box>
          <Box>
            <Button
              colorScheme="blue"
              rounded="2xl"
              width="88px"
              marginTop={3}
              onPress={() => navigation.navigate('Player')}
            >
              Play
            </Button>
          </Box>
          <Box>
            <Text>
              {description}
              {isFullDescription || !isLongDescription ? null : (
                <Pressable onPress={() => setIsFullDescription(true)}>
                  <Text bold color="white">
                    see more
                  </Text>
                </Pressable>
              )}
            </Text>
          </Box>

          <Pressable
            onPress={() =>
              navigation.navigate('Episodes', {
                title: episode.podcast.name,
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
      </Layout>
    )
  }
  return null
}
