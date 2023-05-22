import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import {
  Box,
  ChevronDownIcon,
  Heading,
  HStack,
  IconButton,
  Image,
  Spinner,
  Text,
  VStack,
} from 'native-base'

import { usePlayback } from '../hooks/usePlayback'
import { usePlaybackStore } from '../hooks/usePlaybackStore'
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

export default function Player({
  navigation,
  route,
}: PodcastStackScreenProps<'Player'>) {
  const {
    onPlayPausePressed,
    onSliderValueChange,
    onSliderValueChangeComplete,
    getPlaybackSliderPosition,
    goTenSecondForwardOrBackward,
    timeElapsed,
    timeRemaining,
  } = usePlayback()

  const { playbackInstance, isPlaying, track } = usePlaybackStore()

  return playbackInstance?.status.isLoaded && track ? (
    <Box h="100%" paddingX={3} safeAreaTop safeAreaX variant="layout">
      <VStack minH="90%" alignItems="center">
        <HStack width="100%">
          <IconButton
            icon={<ChevronDownIcon as="Hide player page" />}
            onPress={() => navigation.goBack()}
            variant="ghost"
            colorScheme="white"
            mr={2}
          />

          <Box justifyContent="center">
            <Text>PLAYING FROM PODCAST</Text>
            <Heading>{track.collectionName}</Heading>
          </Box>
        </HStack>
        <Image
          borderRadius={2}
          source={{
            uri: track.trackImageURL,
          }}
          alt="Alternate Text"
          size="2xl"
          alignSelf="center"
          marginTop={15}
        />
        <Box marginTop={6}>
          <Heading>{track.trackName}</Heading>
          <Text>{track.collectionName}</Text>
        </Box>
        <VStack width="100%">
          <HStack width="100%" alignItems="center" justifyContent="center">
            <IconButton onPress={() => goTenSecondForwardOrBackward(-10000)}>
              <AntDesign name="stepbackward" size={20} color="white" />
            </IconButton>
            <IconButton
              onPress={() =>
                onPlayPausePressed({
                  ...track,
                })
              }
              accessibilityLabel="Play"
              icon={
                isPlaying ? (
                  <AntDesign name="pausecircle" size={60} color="white" />
                ) : (
                  <AntDesign name="play" size={60} color="white" />
                )
              }
              size="md"
              _pressed={{ bg: 'coolGray.500' }}
            />

            <IconButton onPress={() => goTenSecondForwardOrBackward(10000)}>
              <AntDesign name="stepforward" size={20} color="white" />
            </IconButton>
          </HStack>
          <Slider
            value={getPlaybackSliderPosition()}
            onValueChange={() => onSliderValueChange}
            onSlidingComplete={onSliderValueChangeComplete}
            disabled={!playbackInstance?.status.isLoaded}
            thumbTintColor="white"
            style={{ width: '100%', height: 40 }}
          />
        </VStack>
        <HStack width="100%" alignItems="center" justifyContent="space-between">
          <Text>{timeElapsed}</Text>
          <Text>{timeRemaining}</Text>
        </HStack>
      </VStack>
    </Box>
  ) : (
    <Box
      h="100%"
      safeAreaTop
      safeAreaX
      variant="layout"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner accessibilityLabel="Loading episodes" />
    </Box>
  )
}
