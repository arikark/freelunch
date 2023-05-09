import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import {
  Audio,
  AVPlaybackStatus,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from 'expo-av'
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

const episode: EpisodeProps = {
  podcastTitle: 'The Daily',
  episodeTitle: 'How Democrats Can Win',
  description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. `,
  dateCreated: '2022-11-09 00:00:00',
  durationInSeconds: 7200,
  secondsPlayed: 6023,
  image: 'https://wallpaperaccess.com/full/317501.jpg',
}

export default function Player({
  navigation,
}: PodcastStackScreenProps<'Player'>) {
  const title = 'How Democrats Can Win'
  const author = 'The Daily'
  // sound of conversation
  const audioUrl =
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

  const description = `Lorem ipsum do`

  const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] =
    useState<boolean>(false)

  const [isSeeking, setIsSeeking] = useState<boolean>(false)
  const playback = usePlaybackStore()

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      playback.setIsBuffering(status.isBuffering)
      playback.setPlaybackInstancePosition(status.positionMillis)
      playback.setPlaybackInstanceDuration(status.durationMillis as number)
      playback.setShouldPlay(status.shouldPlay)
      playback.setMuted(status.isMuted)
      playback.setVolume(status.volume)
      playback.setShouldCorrectPitch(status.shouldCorrectPitch)
    } else if (status.error) {
      console.log(`FATAL PLAYER ERROR: ${status.error}`)
    }
  }

  useEffect(() => {
    const loadNewPlaybackInstance = async (playing: boolean) => {
      // check if the song that is being played is the same as the one that is being requested
      // if (playback.playbackInstance?.sound !== null) {
      //   await playback.playbackInstance?.sound.unloadAsync()
      //   playback.setplaybackInstance(null)
      // }

      if (!playback.playbackInstance?.sound) {
        const source = { uri: audioUrl }
        const initialStatus = {
          shouldPlay: playing,
          shouldCorrectPitch: playback.shouldCorrectPitch,
        }

        const playbackInstance = await Audio.Sound.createAsync(
          source,
          initialStatus,
          onPlaybackStatusUpdate
        )
        playback.setPlaybackInstance(playbackInstance)
      }
    }

    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,

      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playThroughEarpieceAndroid: false,
    })

    loadNewPlaybackInstance(playback.isPlaying)
  }, [])

  const onPlayPausePressed = () => {
    if (playback.playbackInstance?.sound != null) {
      if (playback.isPlaying) {
        playback.playbackInstance?.sound.pauseAsync().then(() => {
          playback.setIsPlaying(false)
        })
      } else {
        playback.playbackInstance.sound.playAsync().then(() => {
          playback.setIsPlaying(true)
        })
      }
    }
  }

  const onSliderValueChange = () => {
    if (playback.playbackInstance?.sound != null && !isSeeking) {
      setIsSeeking(true)
      setShouldPlayAtEndOfSeek(playback.isPlaying)
      playback.playbackInstance?.sound.pauseAsync()
    }
  }
  const onSliderValueChangeComplete = (value: number) => {
    if (playback.playbackInstance?.sound != null) {
      setIsSeeking(false)
      const seekPosition = value * playback.playbackInstanceDuration
      if (shouldPlayAtEndOfSeek) {
        playback.playbackInstance.sound.playFromPositionAsync(seekPosition)
      } else {
        playback.playbackInstance.sound.setPositionAsync(seekPosition)
      }
    }
  }
  const getPlaybackSliderPosition = () => {
    if (
      playback.playbackInstance?.sound != null &&
      playback.playbackInstancePosition != null &&
      playback.playbackInstanceDuration != null
    ) {
      const position =
        playback.playbackInstancePosition / playback.playbackInstanceDuration
      return position
    }
    return 0
  }
  const getMMSSFromMillis = (millis: number) => {
    const totalSeconds = millis / 1000
    const seconds = Math.floor(totalSeconds % 60)
    const minutes = Math.floor(totalSeconds / 60)

    const padWithZero = (number: number) => {
      const string = number.toString()
      if (number < 10) {
        return `0${string}`
      }
      return string
    }
    return `${padWithZero(minutes)}:${padWithZero(seconds)}`
  }

  const goTenSecondForwardOrBackward = (value: number) => {
    playback.playbackInstance?.sound.setStatusAsync({
      positionMillis: playback.playbackInstancePosition + value,
    })
  }

  const timeElapsed = getMMSSFromMillis(playback.playbackInstancePosition)
  const timeRemaining = getMMSSFromMillis(
    playback.playbackInstanceDuration - playback.playbackInstancePosition
  )

  return playback.playbackInstance?.status.isLoaded ? (
    <Box h="100%" paddingX={3} safeAreaTop safeAreaX variant="layout">
      <VStack minH="90%" alignItems="center">
        <HStack width="100%" alignItems="center" justifyContent="flex-start">
          <IconButton
            icon={<ChevronDownIcon as="Hide player page" />}
            onPress={() => navigation.goBack()}
            variant="ghost"
            colorScheme="white"
            mr="15%"
          />

          <Box alignItems="center">
            <Text>PLAYING FROM PODCAST</Text>
            <Heading>{episode.podcastTitle}</Heading>
          </Box>
        </HStack>
        <Image
          borderRadius={2}
          source={{
            uri: episode.image,
          }}
          alt="Alternate Text"
          size="2xl"
          alignSelf="center"
          marginTop={15}
        />
        <Box marginTop={6}>
          <Heading>{episode.episodeTitle}</Heading>
          <Text>{episode.podcastTitle}</Text>
        </Box>
        <VStack width="100%">
          <HStack width="100%" alignItems="center" justifyContent="center">
            <IconButton onPress={() => goTenSecondForwardOrBackward(-10000)}>
              <AntDesign name="stepbackward" size={20} color="white" />
            </IconButton>
            <IconButton
              onPress={onPlayPausePressed}
              accessibilityLabel="Play"
              icon={
                playback.isPlaying ? (
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
            disabled={!playback.playbackInstance?.status.isLoaded}
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
