import React from 'react'
import moment from 'moment'
import {
  ArrowBackIcon,
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from 'native-base'

import { PodcastStackScreenProps } from '../types'

type EpisodeProps = {
  podcastTitle: string
  episodeTitle: string
  description: string
  dateCreated: string
  durationInSeconds: number
  secondsPlayed: number
  image: string
}
const episode: EpisodeProps = {
  podcastTitle: 'The Daily',
  episodeTitle: 'How Democrats Can Win',
  description: 'How the Democrats can win the 2020 election',
  dateCreated: '2022-11-09 00:00:00',
  durationInSeconds: 7200,
  secondsPlayed: 6023,
  image: 'https://wallpaperaccess.com/full/317501.jpg',
}

export default function Episode({
  navigation,
  route,
}: PodcastStackScreenProps<'Episode'>) {
  const { title } = route.params

  const formattedDate = moment(episode.durationInSeconds).fromNow()
  // Format time as 1 hour and 20 minutes left
  const timeRemaining = moment
    .duration(episode.durationInSeconds - episode.secondsPlayed, 'seconds')
    .humanize()

  return (
    <Box h="100%" paddingX={4} safeAreaTop safeAreaX variant="layout">
      <HStack alignItems="center">
        <IconButton
          icon={<ArrowBackIcon />}
          onPress={() => navigation.goBack()}
          mr={4}
        />
      </HStack>
      <VStack minH="28%" justifyContent="space-between">
        <Box minH="17%" justifyContent="space-between">
          <Image
            borderRadius={8}
            source={{
              uri: episode.image,
            }}
            alt="Alternate Text"
            size="sm"
            mr="12px"
          />
          <Heading color="white">{title}</Heading>
        </Box>
        <Box>
          <Text fontWeight="bold">{episode.podcastTitle}</Text>
          <Text
            fontSize={10}
          >{`${formattedDate} • ${timeRemaining} left`}</Text>
        </Box>
        <Box>
          <Button colorScheme="blue" rounded="2xl" width="88px">
            Play
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}
